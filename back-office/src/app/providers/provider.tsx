import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/provider';
import OccupationViewModel from '../view-models/provider';

@inject()
export default class Provider extends Component {
    private readonly viewModel: OccupationViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new OccupationViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
