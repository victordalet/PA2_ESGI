import React from "react";
import {ControllerProps, ControllerState, FormLocation} from "../@types/location";
import LocationView from "../views/location";
import LocationViewModel from "../view-models/location";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    state = {
        service: [],
        location: [],
    };

    private readonly locationViewModel: LocationViewModel;

    constructor(props: ControllerProps) {
        super(props);
        this.locationViewModel = new LocationViewModel();
    }


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
                allSelectedRadioContact={this.locationViewModel.allSelectedRadioContact}
                resetChoiceConcierge={this.locationViewModel.resetChoiceConcierge}
                storeFormInJSON={this.createLocation}/>
        );
    }
}