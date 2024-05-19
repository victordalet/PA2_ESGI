import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/inventory';
import ViewModel from '../view-models/inventory';

@inject()
export default class Inventory extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
