import React from "react";
import {ControllerProps, ControllerState, locationType, YoloResponse} from "../@types/location";
import LocationViewModel from "../view-models/location";
import {haveBailToken, haveToken} from "../../security/token";
import LocationView from "../views/location";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    state: ControllerState = {
        price: 0,
        locationTypes: [],
        selectedLocationTypes: []
    };

    private readonly locationViewModel: LocationViewModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        haveBailToken().then(r => {
            if (!r) {
                document.location.href = "/home";
            }
        });
        this.getTypeLocation('location');
        this.locationViewModel = new LocationViewModel();
    }


    private validationCaptcha = (value: any) => {
        console.log(value);
    };

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
        if (data.description === '') {
            return;
        }
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(`${apiPath}/location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                created_by: data.email,
                name: data.nameFounder,
                description_json: JSON.stringify(data),
                description: data.description,
                address: data.address,
                latitude: 0,
                longitude: 0,
                capacity: data.numberRoom,
                price: 100,
                type: data.typeLocation,
                icons: ''
            })
        });
        const id = await res.json();
        this.state.selectedLocationTypes.map(async (locationType) => {
            await this.associateLocationToUser(id.id, locationType.id);
        });
        await this.uploadImage(id.id);
    };

    private associateLocationToUser = async (id: number, locationTypeId: number) => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(`${apiPath}/type_location/associate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                id: id,
                type_location: locationTypeId
            })
        });
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

    private uploadImage = async (id: number) => {
        const file = (document.getElementById("image") as HTMLInputElement).files;
        if (file) {
            const formData = new FormData();
            formData.append('file', file[0]);
            formData.append('picture', `location-${id.toString()}`);
            const apiPath = process.env.API_HOST || 'http://localhost:3001';
            await fetch(`${apiPath}/picture`, {
                method: "POST",
                headers: {
                    'authorization': localStorage.getItem('token') || ''
                },
                body: formData
            });
            document.location.href = "/resources";
        }
    };

    public getPredictYolo = async () => {
        const apiPath = process.env.YOLO_ESTIMATOR_PORT || 'http://localhost:5000';
        const imageElement = (document.getElementById("image-file-to-yolo") as HTMLInputElement).files;
        const formData = new FormData();
        if (imageElement) {
            console.log(imageElement[0]);
            formData.append('image', imageElement[0]);
            const response = await fetch(`${apiPath}/predict`, {
                method: 'POST',
                body: formData
            });
            const data: YoloResponse = await response.json();
            document.getElementById('price-estimate-by-yolo')!.innerText = `Estimate Price: ${data.price.toString()} €`;
            const body = document.querySelector<HTMLElement>('.container-yolo-image-result');
            if (body) {
                body.style.backgroundImage = `url(data:image/png;base64,${data.image})`;
            }
        }
    };


    render() {
        return (
            <LocationView
                addTypeLocation={this.addTypeLocation}
                locationTypes={this.state.locationTypes}
                openOrCloseOpener={this.locationViewModel.openOrCloseOpener}
                getPredictYolo={this.getPredictYolo}
                validationCaptcha={this.validationCaptcha}
                activeStep2={this.locationViewModel.activeStep2}
                allSelectedRadioContact={this.locationViewModel.allSelectedRadioContact}
                resetChoiceConcierge={this.locationViewModel.resetChoiceConcierge}
                storeFormInJSON={this.createLocation}/>
        );
    }


}
