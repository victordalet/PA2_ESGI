import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/home';
import HomeViewModel from "../view-models/Home";
import {Navbar} from "../../components/navbar";

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

        this.fetchService();
        this.fetchLocation();
        this.homeViewModel.animationStart();
    }


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
        const {viewModel} = this.props;

        if (this.state.service.length === 0 || this.state.location.length === 0) {
            return <Navbar/>;
        }


        return (
            <View
            />
        );
    }
}
