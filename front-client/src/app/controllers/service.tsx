import React from "react";
import ServiceView from "../views/service";
import {ControllerProps, ControllerState} from "../@types/service";
import {Navbar} from "../../components/navbar";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {


    constructor(props: ControllerProps) {
        super(props);
        this.fetchService();
    }

    state = {
        service: [],
    };


    private fetchService = () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + '/service', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        }).then((res) => {
            res.json().then((data) => {
                this.setState({service: data});
            });
        });
    };

    render() {

        if (this.state.service.length === 0) {
            return <Navbar/>;
        }

        return <ServiceView service={this.state.service}/>;
    }
}