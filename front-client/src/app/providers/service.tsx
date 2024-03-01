import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/service';
import ViewModel from '../view-models/service';

@inject()
export default class Service extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
