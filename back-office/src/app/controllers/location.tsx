import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/location';
import View from '../views/location';
import {Navbar} from "../../components/navbar";

@observer
export default class LocationController extends Component<
    ControllerProps,
    ControllerState
> {

    state: ControllerState = {
        data: []
    };


    render() {


        if (this.state.data.length === 0) {
            return <div><Navbar/></div>;
        }
        return (

            <View
                data={this.state.data}/>
        );
    }
}
