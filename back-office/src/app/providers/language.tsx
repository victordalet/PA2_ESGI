import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/language';
import ViewModel from '../view-models/language';

@inject()
export default class Language extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
