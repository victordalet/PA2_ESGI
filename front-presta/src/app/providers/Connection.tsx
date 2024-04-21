import {inject} from 'mobx-react';
import {Component} from 'react';

import Controller from '../controllers/Connection';
import ViewModel from '../view-models/Connection';
@inject()
export default class Connection extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {
        return <Controller viewModel={this.viewModel}/>;
    }
}
