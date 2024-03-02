import {LocationResponse, ViewProps} from "../@types/location";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Card} from "../../components/card";

export default class LocationView extends React.Component <ViewProps> {
    render() {


        const {
            location,
            filterLocationByNameOrDescription,
            filterLocationByCity,
            filterLocationByCapacity,
            filterByPrice
        } = this.props;


        return (
            <div>
                <Navbar/>
                <div className="container-location">
                    <h2>Locations</h2>
                    <div className="container-filter">
                        <input type="text" id={"search"} onChange={filterLocationByNameOrDescription}
                               placeholder="Search..."/>
                        <input type={'text'} id={"city"} onChange={filterLocationByCity} placeholder={"City..."}/>
                        <input type={'number'} id={'capacity'} onChange={filterLocationByCapacity}
                               placeholder={"Capacity..."}/>
                        <select onChange={filterByPrice}>
                            <option value="0">ascending price</option>
                            <option value="1">descending price</option>
                        </select>
                    </div>
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