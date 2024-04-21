import React, {Component} from "react";
import {observer} from "mobx-react";

import {ControllerProps, ControllerState, StatsData, StatsUser} from "../@types/Home";
import View from "../views/home";
import HomeViewModel from "../view-models/Home";
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";

@observer
export default class HomeController extends Component<
    ControllerProps,
    ControllerState
> {
    state: ControllerState = {
        addInput: "",
        stats: {
            nb_users: 0,
            nb_remove_user: 0,
            nb_premium: 0,
            nb_users_created_this_week: [],
            nb_services: 0,
            nb_location: 0,
            number_job: 0,
            number_location_type: 0,
        },
        data: [
            {name: "Number User", number: 0},
            {name: "Number Premium", number: 0},
            {name: "Number Services", number: 0},
            {name: "Number Location", number: 0},
            {name: "Number Job", number: 0},
            {name: "Number Location Type", number: 0},
        ],
    };

    homeViewModel = new HomeViewModel();

    constructor(props: any, context: any) {
        super(props, context);
        haveToken();
        this.fetchStats();
        this.homeViewModel.animationStart();
    }

    private fetchStats = () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        fetch(apiPath + "/user/stats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        }).then((res) => {
            res.json().then((data: StatsUser) => {
                this.setState({
                    stats: data,
                });
                this.setState({
                    data: [
                        {name: "Number User", number: data.nb_users},
                        {name: "Number Premium", number: data.nb_premium},
                        {name: "Number Services", number: data.nb_services},
                        {name: "Number Location", number: data.nb_location},
                        {name: "Number Job", number: data.number_job},
                        {name: "Number Location Type", number: data.number_location_type},
                    ],
                });
            });
        });
    };

    render() {

        if (this.state.stats.nb_users === 0) {

            return (
                <Loading/>
            );
        }

        return <View
            data={this.state.data}
            stats={this.state.stats}/>;
    }
}
