import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/home';
import {dataConnection} from "../@types/Connection";

@observer
export default class HomeController extends Component<
    ControllerProps,
    ControllerState
> {
    state = {
        addInput: ''
    };

    constructor(props: any, context: any) {
        super(props, context);
        this.haveToken();
    }

    private onInputChange = (name: string) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState<any>({
            [name]: e.target.value
        });
    };


    haveToken = () => {
        if (localStorage.getItem('token') === null || undefined) {
            document.location.href = '/login';
        } else {
            const apiPath = process.env.API_HOST || 'http://localhost:3001';
            fetch(apiPath + '/user/isAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token') || ''
                }
            }).then((res) => {
                console.log(res);
                res.json().then((data: dataConnection) => {
                    if (!data.connection) {
                        document.location.href = '/login';
                    }
                });
            });
        }
    };

    render() {
        const {viewModel} = this.props;
        const {addInput} = this.state;

        return (
            <View
                onInputChange={this.onInputChange}
            />
        );
    }
}
