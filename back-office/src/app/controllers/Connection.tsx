import {observer} from 'mobx-react';
import React, {Component} from 'react';

import {ControllerProps} from '../@types/Connection';
import View from '../views/connection';
import {ControllerState} from "../@types/Connection";
import * as Process from "process";


@observer
export default class ConnectionController extends Component<ControllerProps, ControllerState> {

    state: ControllerState = {
        email: '',
        password: ''
    };

    private testLogin = () => {
        fetch(Process.env.API_HOST + '/connection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    console.log(data);
                });
            } else {
                console.log('error');
            }
        });
    };

    private onInputChange = (name: string) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState<any>({
            [name]: e.target.value
        });
    };


    render() {
        const {viewModel} = this.props;
        return <View testLogin={this.testLogin} onInputChange={this.onInputChange}/>;
    }
}
