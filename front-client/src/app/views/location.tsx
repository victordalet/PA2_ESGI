import {LocationResponse, ViewProps} from "../@types/location";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Card} from "../../components/card";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";
import {MultiSelect} from "react-multi-select-component";

export default class LocationView extends React.Component <ViewProps> {
    render() {


        const {
            location,
            filterLocationByNameOrDescription,
            filterLocationByCity,
            filterByPrice,
            locationTypes,
            handleChangeSelected,
            selected
        } = this.props;


        return (
            <div>
                <Navbar/>
                <ChatBot/>
                <Language/>
                <div className="container-location">
                    <h2>Locations</h2>
                    <div className="container-filter">
                        <input type="text" id={"search"} onChange={filterLocationByNameOrDescription}
                               placeholder="Search..."/>
                        <input type={'text'} id={"city"} onChange={filterLocationByCity} placeholder={"City..."}/>
                        <MultiSelect options={
                            locationTypes.map((type) => {
                                return {label: type.name, value: type.name};
                            })
                        } value={selected} onChange={handleChangeSelected} labelledBy={''}/>
                        <select onChange={filterByPrice}>
                            <option value="0">ascending price</option>
                            <option value="1">descending price</option>
                        </select>
                    </div>
                    <div className={"container-card"}>
                        {
                            location.map((location: LocationResponse) => {
                                if (location.is_valid === 2)
                                    return (
                                        <Card cardInfo={{
                                            title: location.name,
                                            description: '',
                                            price: location.price,
                                            location: location.address,
                                            id: location.id,
                                            type: 'location'
                                        }} onclick={() => {
                                            window.location.href = '/reserve?' + location.id?.toString() + '&a=false';
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