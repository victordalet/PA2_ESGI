import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/home';

@observer
export default class HomeController extends Component<
    ControllerProps,
    ControllerState
> {
    state = {
        addInput: ''
    };

    private onInputChange = (name: string) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState<any>({
            [name]: e.target.value
        });
    };


    render() {
        const {viewModel} = this.props;
        const {addInput} = this.state;

        return (
            <View
                onInputChange={this.onInputChange}
            />
        );
    }
}
