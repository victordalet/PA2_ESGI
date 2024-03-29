import React, {Component} from "react";
import {observer} from "mobx-react";

import {ControllerProps, ControllerState, DataResponse} from '../@types/location';
import View from '../views/location';
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";
import LocationViewModel from "../view-models/location";

@observer
export default class LocationController extends Component<
    ControllerProps,
    ControllerState
> {

    locationViewModel: LocationViewModel;

    constructor(props: ControllerProps) {
        super(props);
        this.locationViewModel = new LocationViewModel();
        haveToken();
        this.getData();
    }

    state: ControllerState = {
        data: [],
        dataNoFilter: [],
    };

    getData = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        fetch(apiPath + "/location", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        }).then((r) => {
            console.log(r);
            r.json().then((data: DataResponse[]) => {
                this.setState({
                    data: data,
                    dataNoFilter: data,
                });
            });
        });
    };

    public priceFilter = () => {
        this.setState({data: this.locationViewModel.priceFilter(this.state.dataNoFilter)});
    };

    public searchFilter = () => {
        this.setState({data: this.locationViewModel.searchFilter(this.state.dataNoFilter)});
    };

    public capacityFilter = () => {
        this.setState({data: this.locationViewModel.capacityFilter(this.state.dataNoFilter)});
    };

    render() {
        if (this.state.dataNoFilter.length === 0) {
            return <Loading/>;
        }
        return <View
            data={this.state.data}
            capacityFilter={this.capacityFilter}
            priceFilter={this.priceFilter}
            searchFilter={this.searchFilter}/>;
    }
}
