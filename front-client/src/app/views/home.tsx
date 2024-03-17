import React from 'react';

import {ViewProps} from '../@types/Home';
import {Navbar} from "../../components/navbar";
import {Card} from "../../components/card";
import {Coordinate, MapComponents} from "../../components/map";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";



export default class HomeView extends React.Component <ViewProps> {


    render() {
        const {
            service,
            location
        } = this.props;


        return (
            <div className="home-page">
                <Navbar/>
                <ChatBot/>
                <Language/>
                <div className={"container-home-page"}>
                    <h1>Welcome to Paris Caretaker Services</h1>
                    <h3>Last Location : </h3>
                    <div className={"container-last-location"}>
                        {
                            location.map((l, index) => {
                                if (index > location.length - 6) {
                                    return (
                                        <Card
                                            onclick={() => {
                                                window.location.href = '/reserve?' + l.id + '&a=false';
                                            }}
                                            cardInfo={{
                                                title: l.name,
                                                description: '',
                                                price: l.price,
                                                location: l.address,
                                                id: l.id,
                                                type: 'location'
                                            }}></Card>
                                    );
                                }
                            })
                        }
                    </div>
                    <h3>Last Services : </h3>
                    <div className={"container-last-services"}>
                        {
                            service.map((s, index) => {
                                if (index > service.length - 6) {
                                    return (
                                        <Card
                                            cardInfo={{
                                                title: s.name,
                                                description: '',
                                                price: s.price,
                                                id: s.id,
                                                type: 'service'
                                            }}></Card>
                                    );
                                }
                            })
                        }
                    </div>
                    <h3>Establishment Location : </h3>
                    <div className={"map"}>
                        <MapComponents dataCoordinate={location.map(l => {
                            return {
                                lat: l.latitude,
                                long: l.longitude,
                                city: l.address
                            };
                        })}/>
                    </div>
                </div>
            </div>
        );
    }
}
