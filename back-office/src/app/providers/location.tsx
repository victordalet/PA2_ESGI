import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/location';
import ViewModel from '../view-models/Home';

@inject()
export default class Location extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
