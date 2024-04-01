import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/message';
import ViewModel from '../view-models/message';

@inject()
export default class Message extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
