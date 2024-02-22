import {inject} from 'mobx-react';
import {Component} from 'react';

import UserModel from '../models/domain/UsersModel';
import Controller from '../controllers/Home';
import ViewModel from '../view-models/Home';
import Models from '../models';

@inject(Models.type.USERS_MODEL)
export default class Home extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        const userModel: UserModel = props[Models.type.USERS_MODEL];

        this.viewModel = new ViewModel(userModel);
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
