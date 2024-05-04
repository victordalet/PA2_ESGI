import React, {Component} from "react";
import {observer} from "mobx-react";

import ServiceViewModel from "../view-models/service";
import {ControllerProps, ControllerState, resultData} from '../@types/service';
import View from '../views/service';
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";
import {ServiceModel} from "../model/service";


@observer
export default class ServiceControllers extends Component<
    ControllerProps,
    ControllerState
> {

    serviceViewModel: ServiceViewModel;
    serviceModel: ServiceModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.serviceModel = new ServiceModel();
        this.serviceViewModel = new ServiceViewModel();
        this.getData();
    }

    state: ControllerState = {
        data: [],
        dataNoFilter: [],
    };

    getData = async () => {
        const data = await this.serviceModel.getData();
        this.setState({
            data: data,
            dataNoFilter: data,
        });
    };

    public priceFilter = () => {
        this.setState({data: this.serviceViewModel.priceFilter(this.state.dataNoFilter)});
    };

    public searchFilter = () => {
        this.setState({data: this.serviceViewModel.searchFilter(this.state.dataNoFilter)});
    };

    public isValidateFilter = () => {
        this.setState({data: this.serviceViewModel.isValidateFilter(this.state.dataNoFilter)});
    };


    render() {

        return <View
            acceptService={this.serviceModel.acceptService}
            isValidateFilter={this.isValidateFilter}
            deleteService={this.serviceModel.deleteService}
            data={this.state.data}
            priceFilter={this.priceFilter}
            searchFilter={this.searchFilter}/>;
    }
}
