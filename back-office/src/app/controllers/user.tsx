import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/user';

@observer
export default class UserControllers extends Component<
    ControllerProps,
    ControllerState
> {


    render() {


        return (
            <View/>
        );
    }
}
