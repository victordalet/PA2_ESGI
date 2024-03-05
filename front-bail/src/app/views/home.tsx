import React from 'react';

import {ViewProps} from '../@types/Home';
import {Navbar} from "../../components/navbar";
import {Language} from "../../components/language";


export default class HomeView extends React.Component <ViewProps> {


    render() {


        return (
            <div className="home-page">
                <Navbar/>
                <Language/>
                <div className={"container-choice-creation"}>
                    <div className={"box"} onClick={() => document.location.href = '/location'}>
                        <h2>Create a rental</h2>
                        <button onClick={() => document.location.href = '/location'} className={"btn"}>Start</button>
                    </div>
                    <div className={"box"} onClick={() => document.location.href = '/service'}>
                        <h2>Create a service</h2>
                        <button onClick={() => document.location.href = '/service'} className={"btn"}>Start</button>
                    </div>
                </div>
            </div>
        );
    }
}
