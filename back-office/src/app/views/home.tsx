import React, {Component} from 'react';

import {ViewProps} from '../@types/Home';
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class HomeView extends Component<ViewProps> {


    data: number[] = [
        20, 10, 20, 20, 10, 20, 20, 90, 20, 50
    ];

    render() {
        const {
            onInputChange
        } = this.props;

        return (
            <div className="home-page">
                <Navbar/>
                <div className="home-stats">
                    <div className={"number-stat"}>
                        <div className={"round"}><i className={"ai-people-group"}></i></div>
                        <h2>2000</h2>
                    </div>
                    <div className={"number-stat"}>
                        <div className={"round"}><i className={"ai-person-cross"}></i></div>
                        <h2>2000</h2>
                    </div>
                    <div className={"number-stat"}>
                        <div className={"round"}><i className={"ai-newspaper"}></i></div>
                        <h2>2000</h2>
                    </div>
                </div>

                <div className={"chart-stats"}>
                    {this.data.map(number => (
                        <div className={"bar"} style={{height: number.toString() + '%'}}></div>
                    ))}
                </div>
            </div>
        );
    }
}
