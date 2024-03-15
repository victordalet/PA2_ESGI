import {inject} from 'mobx-react';
import {Component} from 'react';


import Controller from '../controllers/scraper';
import ViewModel from '../view-models/scraper';

@inject()
export default class Scraper extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {

        return <Controller viewModel={this.viewModel}/>;
    }
}
