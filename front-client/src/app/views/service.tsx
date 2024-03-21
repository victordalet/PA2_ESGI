import {ServiceResponse, ViewProps} from "../@types/service";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Card} from "../../components/card";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";

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
                <ChatBot/>
                <Language/>
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
                                    <Card
                                        onclick={() => {
                                            window.location.href = '/reserve-service?' + s.id + '&a=false';
                                        }}
                                        cardInfo={{
                                            title: s.name,
                                            description: (<div>{
                                                Array.from(Array(5).keys()).map((i) => {
                                                    if (s.notation) {
                                                        if (i < s.notation) {
                                                            return <i className="ai-star"
                                                                      color={"#d3ae1b"}></i>;
                                                        }
                                                    }
                                                    return <i className="ai-star" color={"#fff"}></i>;
                                                })
                                            }</div>),
                                            price: s.price,
                                            id: s.id,
                                            type: 'service'
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