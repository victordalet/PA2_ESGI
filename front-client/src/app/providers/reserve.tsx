import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/reserve';
import ViewModel from '../view-models/reserve';

@inject()
export default class Reserve extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
