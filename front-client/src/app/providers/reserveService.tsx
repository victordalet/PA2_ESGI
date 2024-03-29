import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/reserveService';
import ViewModel from '../view-models/reserveService';

@inject()
export default class ReserveService extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
