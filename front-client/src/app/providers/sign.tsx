import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/sign';
import ViewModel from '../view-models/sign';

@inject()
export default class Sign extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
