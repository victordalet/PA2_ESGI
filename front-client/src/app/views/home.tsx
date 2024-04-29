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
            location,
            locationTypes
        } = this.props;


        const randomColorArray = [
            '#e54a4a', '#356b0c',
            '#1a968c', '#576AA5',
            '#8757A5', '#C6366F',
            '#DDEA42', '#4D9353',
            '#5595B8', '#9387AD',
            '#E09A0F', '#733E63',];


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
                                if (index > location.length - 6 && l.is_valid === 1) {
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
                    <h3>Rental criterion : </h3>
                    <div className={"container-type-location"}>
                        {
                            locationTypes.map((l, index) => {
                                return (<div
                                    onClick={() => {
                                        window.location.href = '/location?type=' + l.name;
                                    }}
                                    style={{backgroundColor: randomColorArray[index]}}
                                    key={index}
                                    className={"container-last-location"}>{l.name[0].toUpperCase() +
                                    l.name.slice(1).replace('_', ' ')}</div>);
                            })
                        }
                    </div>
                    <h3>Service available : </h3>
                    <div className={"container-last-services"}>
                        {
                            service.map((s, index) => {
                                if (index > service.length - 6) {
                                    return (
                                        <Card
                                            cardInfo={{
                                                title: s.name,
                                                description: '',
                                                price: 0,
                                                id: 1,
                                                type: s.name
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
