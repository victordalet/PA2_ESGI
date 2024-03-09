import {inject} from 'mobx-react';
import {Component} from 'react';

import Controller from '../controllers/accept';
import ViewModel from '../view-models/accept';
@inject()
export default class Accept extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {
        return <Controller viewModel={this.viewModel}/>;
    }
}
