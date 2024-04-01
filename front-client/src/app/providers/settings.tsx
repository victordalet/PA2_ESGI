import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/settings';
import ViewModel from '../view-models/settings';

@inject()
export default class Settings extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
