import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/home';
import HomeViewModel from "../view-models/Home";
import {haveToken} from "../../security/token";

@observer
export default class HomeController extends Component<
    ControllerProps,
    ControllerState
> {
    state = {
        service: [],
        location: [],
    };

    homeViewModel = new HomeViewModel();

    constructor(props: any, context: any) {
        super(props, context);
        haveToken();
    }



    render() {
        const {viewModel} = this.props;

        return (
            <View
            />
        );
    }
}
