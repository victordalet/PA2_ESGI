import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/ticket';

@observer
export default class TicketControllers extends Component<
    ControllerProps,
    ControllerState
> {


    render() {


        return (
            <View />
        );
    }
}
