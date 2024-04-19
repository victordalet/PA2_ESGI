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

    public isValidateFilter = () => {
        this.setState({data: this.locationViewModel.isValidateFilter(this.state.dataNoFilter)});
    };

    public deleteLocation = async (id: number) => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        await fetch(apiPath + "/location/admin/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        document.location.reload();
    };

    public acceptLocation = async (id: number) => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        await fetch(apiPath + "/location/admin-accept", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({location_id: id}),
        });
        document.location.reload();
    };


    render() {
        if (this.state.dataNoFilter.length === 0) {
            return <Loading/>;
        }
        return <View
            acceptLocation={this.acceptLocation}
            isValidateFilter={this.isValidateFilter}
            deleteLocation={this.deleteLocation}
            data={this.state.data}
            capacityFilter={this.capacityFilter}
            priceFilter={this.priceFilter}
            searchFilter={this.searchFilter}/>;
    }
}
