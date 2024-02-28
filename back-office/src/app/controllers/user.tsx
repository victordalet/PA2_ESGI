import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState, resultData} from '../@types/user';
import View from '../views/user';
import {Navbar} from "../../components/navbar";

@observer
export default class UserControllers extends Component<
    ControllerProps,
    ControllerState
> {

    constructor(props: ControllerProps) {
        super(props);
        this.getData();
    }

    state: ControllerState = {
        data: []
    };

    getData = () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        }).then(r => {
            r.json().then((data: resultData[]) => {
                console.log(data);
                this.setState({
                    data: data
                });
            });
        });
    };


    render() {

        if (this.state.data.length === 0) {
            return <div><Navbar/></div>;
        }
        return (
            <View data={this.state.data}/>
        );
    }
}
