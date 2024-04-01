import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/resa';
import ViewModel from '../view-models/resa';

@inject()
export default class Resa extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
