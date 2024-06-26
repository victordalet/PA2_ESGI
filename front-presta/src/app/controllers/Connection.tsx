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

    public testLogin = async (type = 1) => {
        if (!this.verifyFiled()) {
            this.connectionViewModel.openPopup(1);
            return;
        }
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        const res = await fetch(apiPath + "/user/connection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        });
        if (res.type === "cors") {
            this.connectionViewModel.openPopup(0);
        }
        const data = await res.json();
        if (data.connection != null) {
            localStorage.setItem("token", data.connection);
            if (type === 1)
                window.location.href = "/home";
        } else {
            this.connectionViewModel.openPopup(0);
        }

    };

    private onInputChange =
        (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState<any>({
                [name]: e.target.value,
            });
        };


    private verifyFiled = () => {
        const emailInput = document.querySelector<HTMLInputElement>('#email');
        const passwordInput = document.querySelector<HTMLInputElement>('#password');
        if (emailInput && passwordInput) {
            return emailInput.value.length > 0 && passwordInput.value.length > 0;
        }
    };

    public askBail = async () => {
        if (!this.verifyFiled()) {
            this.connectionViewModel.openPopup(1);
            return;
        }
        await this.testLogin(2);
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const rule = document.querySelector<HTMLSelectElement>('#typeRequest')?.value || '';
        if (rule === '') {
            return;
        }
        await fetch(apiPath + '/user/request-bail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                rule: rule,
            })
        });
        this.connectionViewModel.openPopup(2);
    };

    render() {
        const {viewModel} = this.props;
        return (
            <View
                askBail={this.askBail}
                testLogin={this.testLogin}
                onInputChange={this.onInputChange}
            />
        );
    }
}
