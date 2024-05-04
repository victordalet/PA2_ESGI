import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/provider';
import ViewModel from '../view-models/provider';

@inject()
export default class Provider extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
