import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState, resultData} from '../@types/service';
import View from '../views/service';
import {Navbar} from "../../components/navbar";
import {haveToken} from "../../security/token";

@observer
export default class ServiceControllers extends Component<
    ControllerProps,
    ControllerState
> {

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.getData();
    }

    state: ControllerState = {
        data: []
    };

    getData = () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + '/service', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        }).then(r => {
            r.json().then((data: resultData[]) => {
                this.setState({
                    data: data
                });
            });
        });
    };


    render() {

        if (this.state.data.length === 0) {
            return (
                <div>
                    <Navbar/>
                </div>
            );
        }
        return (
            <View data={this.state.data}/>
        );
    }
}
