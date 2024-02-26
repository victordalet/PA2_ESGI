import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/service';

@observer
export default class ServiceControllers extends Component<
    ControllerProps,
    ControllerState
> {


    render() {


        return (
            <View />
        );
    }
}
