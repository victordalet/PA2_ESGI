import React from 'react';

import {ViewProps} from '../@types/Home';
import {Navbar} from "../../components/navbar";
import {Card} from "../../components/card";
import {Coordinate, MapComponents} from "../../components/map";


export default class HomeView extends React.Component <ViewProps> {


    render() {
        const {
            service,
            location
        } = this.props;


        return (
            <div className="home-page">
                <Navbar/>
                <div className={"container-home-page"}>
                    <h3>Last Location : </h3>
                    <div className={"container-last-location"}>
                        {
                            location.map((l, index) => {
                                return (
                                    <Card cardInfo={{
                                        title: l.name,
                                        description: l.description,
                                        price: l.price,
                                        location: l.address
                                    }}></Card>
                                );
                            })
                        }
                    </div>
                    <h3>Services : </h3>
                    <div className={"container-last-services"}>
                        {
                            service.map((s, index) => {
                                return (
                                    <Card cardInfo={{
                                        title: s.name,
                                        description: s.description,
                                        price: s.price
                                    }}></Card>
                                );
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
