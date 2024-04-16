import React, {Component} from "react";
import {observer} from "mobx-react";

import {ControllerProps, ControllerState} from "../@types/Home";
import View from "../views/home";
import HomeViewModel from "../view-models/Home";
import {LocationResponse} from "../@types/location";
import {ServiceResponse} from "../@types/service";
import {Loading} from "../../components/loading";

@observer
export default class HomeController extends Component<
    ControllerProps,
    ControllerState
> {
    state = {
        service: [],
        location: [],
    };

    homeViewModel = new HomeViewModel();

    constructor(props: any, context: any) {
        super(props, context);
        this.homeViewModel.animationStart();
        this.fetchService();
        this.fetchLocation();

    }


    private fetchService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/job', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: ServiceResponse[] = await response.json();
        this.setState({service: data});
    };

    private fetchLocation = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/location', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: LocationResponse[] = await response.json();
        this.setState({location: data});

    };

    render() {
        const {viewModel} = this.props;

        if (this.state.service.length === 0 || this.state.location.length === 0) {
            return <Loading/>;
        }

        return (
            <View
                service={this.state.service}
                location={this.state.location}
            />
        );
    }
}
