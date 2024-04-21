import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/occupation';
import OccupationViewModel from '../view-models/occupation';

@inject()
export default class Occupation extends Component {
    private readonly viewModel: OccupationViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new OccupationViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
