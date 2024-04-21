import React from 'react';

import {ViewProps} from '../@types/Home';
import {Navbar} from "../../components/navbar";


export default class HomeView extends React.Component <ViewProps> {


    render() {
        const {
            stats
        } = this.props;

        return (
            <div className="home-page">
                <Navbar/>
                <h1 style={{textAlign: 'center'}}>Portal of Paris Caretaker Services </h1>
                <div className="home-stats">
                    <div className={"number-stat"}>
                        <div className={"round"}><i className={"ai-people-group"}></i></div>
                        <h2>{stats.nb_users}</h2>
                    </div>
                    <div className={"number-stat"}>
                        <div className={"round"}><i className={"ai-coin"}></i></div>
                        <h2>{stats.nb_premium}</h2>
                    </div>
                    <div className={"number-stat"}>
                        <div className={"round"}><i className="ai-person-cross"></i></div>
                        <h2>{stats.nb_remove_user}</h2>
                    </div>
                </div>

                <div className={"chart-stats"}>
                    <h3>Nb user during last days</h3>
                    {stats.nb_users_created_this_week.map(number => (
                        <div className={"bar"} style={{height: number.toString() + '%'}}></div>
                    ))}
                </div>
            </div>
        );
    }
}
