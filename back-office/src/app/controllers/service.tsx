import React, {Component} from "react";
import {observer} from "mobx-react";

import {
    ControllerProps,
    ControllerState,
    resultData,
} from "../@types/service";
import View from "../views/service";
import {Navbar} from "../../components/navbar";
import {haveToken} from "../../security/token";
import ServiceViewModel from "../view-models/service";

@observer
export default class ServiceControllers extends Component<
    ControllerProps,
    ControllerState
> {

    serviceViewModel: ServiceViewModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.getData();
        this.serviceViewModel = new ServiceViewModel();
    }

    state: ControllerState = {
        data: [],
        dataNoFilter: [],
    };

    getData = () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        fetch(apiPath + "/service", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        }).then((r) => {
            r.json().then((data: resultData[]) => {
                this.setState({
                    data: data,
                    dataNoFilter: data,
                });
            });
        });
    };

    public priceFilter = () => {
        this.setState({data: this.serviceViewModel.priceFilter(this.state.dataNoFilter)});
    };

    public searchFilter = () => {
        this.setState({data: this.serviceViewModel.searchFilter(this.state.dataNoFilter)});
    };

    render() {
        if (this.state.dataNoFilter.length === 0) {
            return (
                <div>
                    <Navbar/>
                </div>
            );
        }
        return <View data={this.state.data}
                     priceFilter={this.priceFilter}
                     searchFilter={this.searchFilter}/>;
    }
}
