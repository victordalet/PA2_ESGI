import {ControllerProps, ControllerState} from "../@types/reserve";
import React from "react";
import {ReserveView} from "../views/reserve";
import {LocationResponse} from "../@types/location";
import {Navbar} from "../../components/navbar";
import {ServiceResponse} from "../@types/service";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {


    private id: number;

    constructor(props: ControllerProps) {
        super(props);
        this.id = parseInt(document.location.href.split('?')[1]);
        this.fetchLocation();
    }


    state: ControllerState = {
        data: {} as LocationResponse,
        services: []
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
                this.setState({data: data.filter((location: ServiceResponse) => location.id === this.id)[0]});
            });
        });
    };


    render() {


        if (this.state.data.name === undefined) {
            return <Navbar/>;
        }

        return <ReserveView
            data={this.state.data} services={this.state.services}/>;
    }

}