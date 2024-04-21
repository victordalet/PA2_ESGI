import {inject} from 'mobx-react';
import {Component} from 'react';

import Controller from '../controllers/element';
import ElementViewModel from '../view-models/element';

@inject()
export default class Element extends Component {
    private readonly viewModel: ElementViewModel;

    constructor(props: any) {

        super(props);

        this.viewModel = new ElementViewModel();
    }

    render() {
        return <Controller viewModel={this.viewModel}/>;
    }
}
