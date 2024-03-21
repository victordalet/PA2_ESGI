import React from "react";
import {Navbar} from "../../components/navbar";
import {ViewProps} from "../@types/reserveService";
import {PopupError} from "../../components/popup";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";
import {Card} from "../../components/card";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment';

export default class ReserveServiceView extends React.Component<ViewProps> {

    render() {

        const {
            service,
            postNotation,
            isCreator,
            deleteService,
            generateFacture,
            deleteLocation,
            location,
            eventCalendar
        } = this.props;

        const now = momentLocalizer(moment);

        return (
            <div>
                <Navbar/>
                <ChatBot/>
                <Language/>
                <PopupError text={"Tank you for your notation"}></PopupError>
                <div className={"container-location-reservation"}>
                    <h1>{service.name}</h1>
                    <div className={"description"}>
                        <div className={"info"}>
                            <h3 id={"price"}><i className="ai-coin"></i>{service.price}</h3>
                            <h3 id={"location"}><i className="ai-alarm"></i>{service.duration}</h3>
                            <h3 id={"contact"}><i className="ai-paper-airplane"></i>{service.created_by}</h3>
                            {
                                isCreator ?
                                    <div className={"reservation"}>
                                        <button id={"cancel"} onClick={deleteService}
                                                style={{background: '#c91919', marginBottom: '20px'}}>Delete
                                        </button>
                                        <button id={"facture"} onClick={generateFacture}>Facture</button>
                                    </div>
                                    : ''
                            }
                        </div>
                    </div>
                    <div className={"if-is-buy"}>
                        {
                            isCreator ?
                                <div>
                                    <h2>Locations</h2>
                                    <div className={"services services-new"}>
                                        {
                                            location.length === 0 ? <h3>No location</h3> :
                                                location.map((loc, index) => {
                                                    return (
                                                        <Card cardInfo={{
                                                            title: loc.name,
                                                            description: (
                                                                <div>{loc.created_by} - <i className="ai-trash"
                                                                                           onClick={() => {
                                                                                               deleteLocation(loc.id);
                                                                                           }}></i></div>),
                                                            price: loc.price,
                                                            type: 'location',
                                                            id: loc.id
                                                        }}/>
                                                    );
                                                })
                                        }</div>
                                    <div className={"calendar"}>
                                        <Calendar
                                            localizer={now}
                                            events={eventCalendar.map((event, index) => {
                                                return {
                                                    start: new Date(event.from_datetime),
                                                    end: new Date(event.to_datetime),
                                                    title: event.user_email
                                                };
                                            })}
                                            startAccessor="start"
                                            endAccessor="end"
                                            style={{height: 500}}/>
                                    </div>
                                </div>
                                :

                                <div className={"notation"}>
                                    <h3>Notation</h3>
                                    <ul className={"stars"}>
                                        {
                                            [1, 2, 3, 4, 5].map((star, index) => {
                                                return (
                                                    <li key={index} onClick={() => postNotation(star)}><i
                                                        className="ai-star"></i></li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
            ;
    }

}