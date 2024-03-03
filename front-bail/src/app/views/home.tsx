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
            </div>
        );
    }
}
