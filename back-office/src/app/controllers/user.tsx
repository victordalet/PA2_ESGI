import React, {Component} from "react";
import {observer} from "mobx-react";

import {ControllerProps, ControllerState, resultData} from '../@types/user';
import View from '../views/user';
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";
import UserViewModel from "../view-models/user";

@observer
export default class UserControllers extends Component<
    ControllerProps,
    ControllerState
> {

    userViewModel: UserViewModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.getData();
        this.userViewModel = new UserViewModel();
    }

    state: ControllerState = {
        data: [],
        dataNoFilter: [],
    };


    getData = () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        fetch(apiPath + "/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        }).then((r) => {
            r.json().then((data: resultData[]) => {
                console.log(data);
                this.setState({
                    data: data,
                    dataNoFilter: data,
                });
            });
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

    public deleteUser = async (email: string) => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        await fetch(apiPath + "/user/admin/" + email, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        document.location.reload();
    };

    render() {
        if (this.state.dataNoFilter.length === 0) {
            return <Loading/>;
        }
        return <View
            deleteUser={this.deleteUser}
            data={this.state.data}
            isPremiumFilter={this.isPremiumFilter}
            searchFilter={this.searchFilter}
            ruleFilter={this.ruleFilter}/>;
    }
}
