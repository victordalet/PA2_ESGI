import React from "react";
import {ControllerProps, ControllerState, LocationService} from "../@types/location";
import LocationViewModel from "../view-models/location";
import {haveBailToken, haveToken} from "../../security/token";
import LocationView from "../views/location";
import {Service} from "../@types/service";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    state: ControllerState = {
        service: [],
        serviceSelected: [],
        price: 0
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
        this.locationViewModel = new LocationViewModel();
        this.fetchService();
    }


    public addServiceSelected = (service: LocationService, index: number) => {
        this.setState({serviceSelected: [...this.state.serviceSelected, service]});
        this.locationViewModel.addServiceToForm(service, index);
    };

    private validationCaptcha = (value: any) => {
        console.log(value);
    };


    private fetchService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/service`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: Service[] = await response.json();
        data.filter((service) => {
            return service.type === 'BAIL';
        });
        this.setState({service: data});
    };


    public createLocation = async () => {
        const data = this.locationViewModel.storeFormInJSON();
        data.service = this.state.serviceSelected;
        console.log(data);
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
                description: JSON.stringify(data),
                address: data.address,
                latitude: 0,
                longitude: 0,
                capacity: data.numberRoom,
                price: 100,
                type: data.typeLocation,
            })
        });
        const id = await res.json();
        await this.uploadImage(id.id);
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
            document.location.href = "/home";
        }
    };


    render() {
        return (
            <LocationView
                validationCaptcha={this.validationCaptcha}
                addServiceToForm={this.addServiceSelected}
                service={this.state.service}
                activeStep2={this.locationViewModel.activeStep2}
                allSelectedRadioContact={this.locationViewModel.allSelectedRadioContact}
                resetChoiceConcierge={this.locationViewModel.resetChoiceConcierge}
                storeFormInJSON={this.createLocation}/>
        );
    }
}