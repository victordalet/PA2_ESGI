import React from "react";
import {Navbar} from "../../components/navbar";
import {ViewProps} from "../@types/resa";
import {Card} from "../../components/card";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";

export class ResaView extends React.Component <ViewProps> {

    render() {

        const {data} = this.props;


        return (
            <div>
                <Navbar/>
                <ChatBot/>
                <Language/>
                <div className={"container-service"}>
                    <h2>Your Reservation</h2>
                    <div className={"container-card"}>
                        {
                            data.map((location, index) => {
                                return (
                                    <Card
                                        onclick={() => {
                                            document.location.href = '/reserve?' + location.id + '&a=true' + '&id2=' + location.location_occupation_id;
                                        }}
                                        cardInfo={{
                                            title: location.name,
                                            description: location.description,
                                            price: location.price,
                                            location: location.address
                                        }}></Card>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}