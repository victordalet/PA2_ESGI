import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState, StatsUser} from '../@types/Home';
import View from '../views/home';
import HomeViewModel from "../view-models/Home";
import {haveToken} from "../../security/token";
import {Navbar} from "../../components/navbar";

@observer
export default class HomeController extends Component<
    ControllerProps,
    ControllerState
> {
    state = {
        addInput: '',
        stats: {
            nb_users: 0,
            nb_remove_user: 0,
            nb_premium: 0,
            nb_users_created_this_week: []
        }
    };

    homeViewModel = new HomeViewModel();

    constructor(props: any, context: any) {
        super(props, context);
        haveToken();
        this.fetchStats();
        this.homeViewModel.animationStart();
    }

    private fetchStats = () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + '/user/stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        }).then((res) => {
            res.json().then((data: StatsUser) => {
                console.log(data);
                this.setState({
                    stats: data
                });
            });
        });
    }




    render() {
        const {viewModel} = this.props;
        const {addInput} = this.state;

        if (this.state.stats.nb_users === 0) {
            return (
                <Navbar/>
            );
        }

        return (
            <View
                stats={this.state.stats}
            />
        );
    }
}
