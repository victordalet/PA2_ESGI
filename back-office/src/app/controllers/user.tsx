import React, {Component} from "react";
import {observer} from "mobx-react";

import {ControllerProps, ControllerState, resultData} from '../@types/user';
import View from '../views/user';
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";
import UserViewModel from "../view-models/user";
import {UserModel} from "../model/user";

@observer
export default class UserControllers extends Component<
    ControllerProps,
    ControllerState
> {

    userViewModel: UserViewModel;
    userModel: UserModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.userModel = new UserModel();
        this.userViewModel = new UserViewModel();
        this.getData();
    }

    state: ControllerState = {
        data: [],
        dataNoFilter: [],
    };


    public getData = async () => {
        const data = await this.userModel.getData();
        this.setState({
            data: data,
            dataNoFilter: data,
        });
    };

    public searchFilter = () => {
        this.setState({data: this.userViewModel.searchFilter(this.state.dataNoFilter)});
    };

    public isPremiumFilter = () => {
        this.setState({data: this.userViewModel.isPremiumFilter(this.state.dataNoFilter)});
    };

    public ruleFilter = () => {
        this.setState({data: this.userViewModel.ruleFilter(this.state.dataNoFilter)});
    };


    render() {
        if (this.state.dataNoFilter.length === 0) {
            return <Loading/>;
        }
        return <View
            addAdmin={this.userModel.addAdmin}
            deleteUser={this.userModel.deleteUser}
            data={this.state.data}
            isPremiumFilter={this.isPremiumFilter}
            searchFilter={this.searchFilter}
            ruleFilter={this.ruleFilter}/>;
    }
}
