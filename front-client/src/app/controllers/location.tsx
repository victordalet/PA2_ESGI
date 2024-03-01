import React from "react";
import LocationView from "../views/location";
import {ControllerProps, ControllerState} from "../@types/location";
import {Navbar} from "../../components/navbar";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    constructor(props:ControllerProps) {
        super(props);
        this.fetchLocation();
    }

    state = {
        location: [],
    };


    private fetchLocation = () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + '/location', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        }).then((res) => {
            res.json().then((data) => {
                this.setState({location: data});
            });
        });
    };

    render() {

        if (this.state.location.length === 0) {
            return <Navbar/>;
        }

        return <LocationView location={this.state.location}/>;
    }
}