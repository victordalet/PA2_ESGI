import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/location';

@observer
export default class LocationController extends Component<
    ControllerProps,
    ControllerState
> {


    render() {


        return (
            <View />
        );
    }
}
