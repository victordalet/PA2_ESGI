import React from "react";
import {ControllerProps, ControllerState, locationType, YoloResponse} from "../@types/location";
import LocationViewModel from "../view-models/location";
import {haveBailToken, haveToken} from "../../security/token";
import LocationView from "../views/location";
import {LocationModel} from "../model/location";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    state: ControllerState = {
        price: 0,
        locationTypes: [],
        selectedLocationTypes: []
    };

    private locationModel: LocationModel;
    private readonly locationViewModel: LocationViewModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.locationModel = new LocationModel();
        haveBailToken().then(r => {
            if (!r) {
                document.location.href = "/home";
            }
        });
        this.getTypeLocation('location');
        this.locationViewModel = new LocationViewModel();
    }


    public addTypeLocation = (type: string, id: number, idView: number) => {
        this.locationViewModel.changeStyleCardSelected(idView);
        if (this.state.selectedLocationTypes.find((locationType) => locationType.id === id)) {
            this.setState({selectedLocationTypes: this.state.selectedLocationTypes.filter((locationType) => locationType.id !== id)});
            return;
        }
        this.setState({selectedLocationTypes: [...this.state.selectedLocationTypes, {name: type, id: id}]});
    };

    public createLocation = async () => {
        const data = this.locationViewModel.storeFormInJSON();
        const id = await this.locationModel.createLocation(data, this.state.selectedLocationTypes.toString());
        this.state.selectedLocationTypes.map(async (locationType) => {
            await this.locationModel.associateLocationToUser(id.id, locationType.id);
        });
        await this.locationModel.uploadImage(id.id);
    };


    private getTypeLocation = async (type: string) => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/type_location`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: locationType[] = await response.json();
        data.map(async (d) => {
            const res = await fetch(`${apiPath}/picture/${d.name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token") || "",
                },
            });
            const picture = await res.json();
            d.pictureUrl = `data:image/png;base64,${picture.base64}`;
            this.setState({locationTypes: [...this.state.locationTypes, d]});
        });
    };


    render() {
        return (
            <LocationView
                addTypeLocation={this.addTypeLocation}
                locationTypes={this.state.locationTypes}
                openOrCloseOpener={this.locationViewModel.openOrCloseOpener}
                getPredictYolo={this.locationModel.getPredictYolo}
                validationCaptcha={this.locationModel.validationCaptcha}
                activeStep2={this.locationViewModel.activeStep2}
                allSelectedRadioContact={this.locationViewModel.allSelectedRadioContact}
                resetChoiceConcierge={this.locationViewModel.resetChoiceConcierge}
                storeFormInJSON={this.createLocation}/>
        );
    }


}
