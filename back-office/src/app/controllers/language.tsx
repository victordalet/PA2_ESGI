import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/language';

@observer
export default class LanguageControllers extends Component<
    ControllerProps,
    ControllerState
> {


    render() {


        return (
            <View/>
        );
    }
}
