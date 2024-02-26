import {Component} from 'react';

import {ViewProps} from '../@types/Home';
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class HomeView extends Component<ViewProps> {
    render() {
        const {
            onInputChange
        } = this.props;

        return (
            <div className="home-page">
                <Navbar/>
                <Table/>
            </div>
        );
    }
}
