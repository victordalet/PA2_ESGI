import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/premium';
import ViewModel from '../view-models/premium';

@inject()
export default class Premium extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
