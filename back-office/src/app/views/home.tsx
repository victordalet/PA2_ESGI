import React from 'react';

import {ViewProps} from '../@types/Home';
import {Navbar} from "../../components/navbar";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


export default class HomeView extends React.Component <ViewProps> {


    render() {
        const {
            stats,
            data
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


                <div className={"chart-stats stats1"}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="number" stroke="#8884d8" activeDot={{r: 8}}/>
                        </LineChart>
                    </ResponsiveContainer>
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
