import {ServiceResponse, ViewProps} from "../@types/service";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Card} from "../../components/card";

export default class ServiceView extends React.Component<ViewProps> {
    render() {

        const {
            service,
            filterByPrice,
            filterServiceByNameOrDescription
        } = this.props;

        return (
            <div>
                <Navbar/>
                <div className="container-service">
                    <h2>Services</h2>
                    <div className="container-filter">
                        <input type="text" onChange={() => {
                            filterServiceByNameOrDescription();
                        }} placeholder="Search..."/>
                        <select onChange={() => {
                            filterByPrice();
                        }}>
                            <option value="0">ascending price</option>
                            <option value="1">descending price</option>
                        </select>
                    </div>
                    <div className={"container-card"}>
                        {
                            service.map((s: ServiceResponse) => {
                                return (
                                    <Card cardInfo={{
                                        title: s.name,
                                        description: s.description,
                                        price: s.price
                                    }} onclick={() => {
                                        window.location.href = '/reserve?' + s.id?.toString() + '&service=true&a=true';
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