import {LocationResponse, ViewProps} from "../@types/location";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Card} from "../../components/card";

export default class LocationView extends React.Component <ViewProps> {
    render() {


        const {location} = this.props;


        return (
            <div>
                <Navbar/>
                <div className="container-location">
                    <div className="container-filter"></div>
                    <h2>Locations</h2>
                    <div className={"container-card"}>
                        {
                            location.map((location: LocationResponse) => {
                                return (
                                    <Card cardInfo={{
                                        title: location.name,
                                        description: location.description,
                                        price: location.price,
                                        location: location.address
                                    }}/>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}