import {observer} from 'mobx-react';
import React, {Component} from 'react';

import {ControllerProps, dataConnection} from '../@types/Connection';
import View from '../views/connection';
import {ControllerState} from "../@types/Connection";
import ConnectionViewModel from "../view-models/Connection";


@observer
export default class ConnectionController extends Component<ControllerProps, ControllerState> {

    state: ControllerState = {
        email: '',
        password: ''
    };

    private connectionViewModel = new ConnectionViewModel();


    public testLogin = () => {
        if (!this.verifyFiled()) {
            this.connectionViewModel.openPopup(1);
            return;
        }
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + '/user/connectionAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then((res) => {
            if (res.type === 'cors') {
                this.connectionViewModel.openPopup(0);
            }
            res.json().then((data: dataConnection) => {
                if (data.connection != null) {
                    localStorage.setItem('token', data.connection);
                    window.location.href = "/home";
                } else {
                    this.connectionViewModel.openPopup(0);
                }
            });
        });
    };

    private onInputChange = (name: string) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState<any>({
            [name]: e.target.value
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
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(apiPath + '/user/request-bail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        this.connectionViewModel.openPopup(2);
    };

    render() {
        const {viewModel} = this.props;
        return <View
            askBail={this.askBail}
            testLogin={this.testLogin}
            onInputChange={this.onInputChange}/>;
    }
}
