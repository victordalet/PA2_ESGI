import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/message';

@observer
export default class MessageControllers extends Component<
    ControllerProps,
    ControllerState
> {


    render() {


        return (
            <View/>
        );
    }
}
