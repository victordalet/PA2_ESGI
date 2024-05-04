import React, {Component} from "react";
import {observer} from "mobx-react";

import {ControllerProps, ControllerState, DataResponse} from '../@types/location';
import View from '../views/location';
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";
import LocationViewModel from "../view-models/location";
import {LocationModel} from "../model/location";

@observer
export default class LocationController extends Component<
    ControllerProps,
    ControllerState
> {

    locationViewModel: LocationViewModel;
    locationModel: LocationModel;

    constructor(props: ControllerProps) {
        super(props);
        this.locationViewModel = new LocationViewModel();
        this.locationModel = new LocationModel();
        haveToken();
        this.getData();
    }

    state: ControllerState = {
        data: [],
        dataNoFilter: [],
    };

    private getData = async () => {
        const data = await this.locationModel.fetchData();
        this.setState({
            data: data,
            dataNoFilter: data,
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


    render() {
        if (this.state.dataNoFilter.length === 0) {
            return <Loading/>;
        }
        return <View
            acceptLocation={this.locationModel.acceptLocation}
            isValidateFilter={this.isValidateFilter}
            deleteLocation={this.locationModel.deleteLocation}
            data={this.state.data}
            capacityFilter={this.capacityFilter}
            priceFilter={this.priceFilter}
            searchFilter={this.searchFilter}/>;
    }
}
