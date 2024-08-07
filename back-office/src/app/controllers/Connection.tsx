import {observer} from "mobx-react";
import React, {Component} from "react";

import {ControllerProps, dataConnection} from "../@types/Connection";
import View from "../views/connection";
import {ControllerState} from "../@types/Connection";
import ConnectionViewModel from "../view-models/Connection";

@observer
export default class ConnectionController extends Component<
    ControllerProps,
    ControllerState
> {
    state: ControllerState = {
        email: "",
        password: "",
    };

    private connectionViewModel = new ConnectionViewModel();

    private testLogin = () => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        fetch(apiPath + "/user/connectionAdmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then((res) => {
            if (res.type === "cors") {
                this.connectionViewModel.openPopup();
            }
            res.json().then((data: dataConnection) => {
                if (data.connection != null) {
                    localStorage.setItem("token", data.connection);
                    window.location.href = "/home";
                } else {
                    this.connectionViewModel.openPopup();
                }
            });
        });
    };

    private onInputChange =
        (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState<any>({
                [name]: e.target.value,
            });
        };

    render() {
        const {viewModel} = this.props;
        return (
            <View testLogin={this.testLogin} onInputChange={this.onInputChange}/>
        );
    }
}
