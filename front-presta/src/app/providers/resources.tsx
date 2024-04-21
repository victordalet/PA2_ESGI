import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/ressources';
import ViewModel from '../view-models/ressources';

@inject()
export default class Resources extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
