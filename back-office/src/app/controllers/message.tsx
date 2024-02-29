import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState, ResponseIllegibleMessage} from '../@types/message';
import View from '../views/message';
import {Navbar} from "../../components/navbar";
import {haveToken} from "../../security/token";

@observer
export default class MessageControllers extends Component<
    ControllerProps,
    ControllerState
> {


    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.getIllegibleMessage();
    }

    state: ControllerState = {
        addInput: '',
        data: []
    };

    onInputChange = (name: string) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState<any>({
            [name]: e.target.value
        });
    };

    addIllegibleMessage = () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + '/message/illegible', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                word: this.state.addInput
            })
        }).then(r => {
            console.log(r);
        });
    };

    getIllegibleMessage = () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + '/message/illegible', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        }).then(r => {
            r.json().then((data: ResponseIllegibleMessage[]) => {
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

            <View onInputChange={this.onInputChange} addIllegibleMessage={this.addIllegibleMessage}
                  data={this.state.data}/>
        );
    }
}
