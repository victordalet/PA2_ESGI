import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {ControllerProps, ControllerState} from '../@types/Home';
import View from '../views/home';
import HomeViewModel from "../view-models/Home";
import {haveAdminToken, haveBailToken, havePrestataireToken, haveToken} from "../../security/token";
import {Loading} from "../../components/loading";

@observer
export default class HomeController extends Component<
    ControllerProps,
    ControllerState
> {
    state = {
        service: [],
        location: [],
        typeUser: ''
    };

    homeViewModel = new HomeViewModel();

    constructor(props: any, context: any) {
        super(props, context);
        haveToken();
        this.getTypeUser();
    }

    private getTypeUser = async () => {
        if (await haveAdminToken()) {
            this.setState({typeUser: 'admin'});
        } else if (await haveBailToken()) {
            this.setState({typeUser: 'bail'});
        } else if (await havePrestataireToken()) {
            this.setState({typeUser: 'prestataire'});
        }
    };


    render() {
        const {viewModel} = this.props;

        if (this.state.typeUser === '') {
            <Loading/>;
        }

        return (
            <View
                typeUser={this.state.typeUser}/>
        );
    }
}
