import React from 'react';

import {ViewProps} from '../@types/Home';
import {Navbar} from "../../components/navbar";
import {Language} from "../../components/language";


export default class HomeView extends React.Component <ViewProps> {


    render() {


        const {typeUser} = this.props;


        return (
            <div className="home-page">
                <Navbar/>
                <Language/>
                <h1 style={{textAlign: 'center', marginTop: '50px'}}>Pro of Paris Caretaker Services</h1>
                <div className={"container-choice-creation"}>
                    {
                        typeUser === 'bail' || typeUser === 'admin' ?
                            <div className={"box"} onClick={() => document.location.href = '/location'}>
                                <h2>Create a rental</h2>
                                <button onClick={() => document.location.href = '/location'} className={"btn"}>Start
                                </button>
                            </div> : ''
                    }
                    {
                        typeUser === 'prestataire' || typeUser === 'admin' ?
                            <div className={"box"} onClick={() => document.location.href = '/service'}>
                                <h2>Become a service provider</h2>
                                <button onClick={() => document.location.href = '/service'} className={"btn"}>Start
                                </button>
                            </div> : ''
                    }
                </div>
            </div>
        );
    }
}
