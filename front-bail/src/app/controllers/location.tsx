import React from "react";
import {ControllerProps, ControllerState, FormLocation} from "../@types/location";
import LocationView from "../views/location";
import LocationViewModel from "../view-models/location";
import {haveToken} from "../../security/token";

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
        this.locationViewModel = new LocationViewModel();
        this.fetchService();
    }


    private fetchService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/service`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data = await response.json();
        this.setState({service: data});
    };


    public createLocation = async () => {
        const data = this.locationViewModel.storeFormInJSON();
        console.log(data);
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(`${apiPath}/location`, {
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
                type: data.typeLocation
            })
        });
    };


    render() {
        return (
            <LocationView
                service={this.state.service}
                activeStep2={this.locationViewModel.activeStep2}
                allSelectedRadioContact={this.locationViewModel.allSelectedRadioContact}
                resetChoiceConcierge={this.locationViewModel.resetChoiceConcierge}
                storeFormInJSON={this.createLocation}/>
        );
    }
}