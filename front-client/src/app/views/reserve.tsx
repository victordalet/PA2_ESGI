import {Navbar} from "../../components/navbar";
import React from "react";
import {ViewProps} from "../@types/reserve";
import {PopupError} from "../../components/popup";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

export class ReserveView extends React.Component <ViewProps> {


    render() {

        const {
            data,
            isReserved,
            fetchReservations,
            addNotation,
            notation,
            messages,
            addMessage,
            deleteOccupation,
            downloadFacture,
            isBail,
            deleteLocation,
            description,
            eventCalendar,
            fetchMessagesForBail,
            postMessageForBail,
            downloadFactureBail,
            nameFiles,
            postFileBail,
            downloadFileBail,
            deleteOccupationBail,
            bailIsOccupied,
            isAdmin,
            services,
            sendRequestService,
            serviceUser
        } = this.props;


        const now = momentLocalizer(moment);


        return (
            <div>
                <Navbar/>
                <ChatBot/>
                <Language/>
                <PopupError text={"Bad date"}/>
                <PopupError text={"Note have been saved"}/>
                <div className={"container-location-reservation"}>
                    <h1>{data.name}</h1>
                    <div className={"description"}>
                        <div className={"description-text"}>
                            {
                                description ?
                                    (
                                        <div>
                                            <h3><span>Description:</span>{data.description}</h3>
                                            <h3><span>Concierge :</span>{description.typeConcierge}</h3>
                                            <h3><span>Address :</span>{description.address}</h3>
                                            <h3><span>Country :</span>{description.country}</h3>
                                            <h3><span>Type :</span>{description.type}</h3>
                                            <h3><span>Type de location :</span>{description.typeLocation}</h3>
                                            <h3><span>Number room :</span>{description.numberRoom}</h3>
                                            <h3><span>Surface :</span>{description.surface}</h3>
                                            <h3><span>Info sup : </span></h3>
                                            <h3><span>Documents :</span></h3>
                                            <div className={"resources-files"}>
                                                {
                                                    nameFiles.map((name, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <h3>{name}</h3>
                                                                <i className="ai-download"
                                                                   onClick={() => downloadFileBail(name)}></i>
                                                            </div>
                                                        );
                                                    })
                                                }
                                                {
                                                    isBail ?
                                                        <div className={"file-transfer"}>
                                                            <input type={"file"} id={"file-input"}/>
                                                            <button onClick={postFileBail}>Send</button>
                                                        </div> : ''
                                                }

                                            </div>
                                        </div>
                                    ) : ''
                            }
                        </div>
                        <div className={"info"}>
                            <h3 id={"price"}><i className="ai-coin"></i>{data.price}</h3>
                            <h3 id={"location"}><i className="ai-map"></i><span
                                id={"location-city"}>{data.address}</span></h3>
                            <h3 id={"contact"}><i className="ai-paper-airplane"></i>{data.created_by}</h3>
                            {
                                !isReserved
                                    ? (
                                        <ul className={"stars"}>
                                            {
                                                [1, 2, 3, 4, 5].map((star, index) => {
                                                    return (
                                                        <li key={index}><i className="ai-star"
                                                                           style={(notation < star) ? {color: '#000'} : {color: '#d3ae1b'}}/>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    )
                                    : ''
                            }

                            {
                                isBail ?
                                    (
                                        <div className={"reservation"}>
                                            <button id={"cancel"} onClick={deleteLocation}
                                                    style={{background: '#c91919', marginBottom: '20px'}}>Delete
                                            </button>
                                            <button id={"facture"} onClick={downloadFactureBail}>My facture</button>
                                        </div>
                                    )
                                    :

                                    (!isReserved ?
                                        (
                                            <div className={"reservation"}>
                                                <input type={"date"} id={"date-start"}/>
                                                <input type={"date"} id={"date-end"}/>
                                                <button id={"reserve"} onClick={fetchReservations}>Reserve</button>
                                            </div>
                                        ) :
                                        (
                                            <div className={"reservation"}>
                                                <button id={"cancel"} onClick={deleteOccupation}
                                                        style={{marginBottom: '20px', background: '#c91919'}}>Cancel
                                                </button>
                                                <button id={"facture"} onClick={downloadFacture}>My facture</button>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>
                    {
                        isReserved || isAdmin ?
                            <div className={"calendar-form-complete"}
                                 style={{marginTop: '100px', width: '40%', padding: '20px'}}>
                                <h2>Take Services</h2>
                                <select id={"service-name"}>
                                    {
                                        services.map((service, index) => {
                                            return (
                                                <option key={service.name} value={service.name}>{service.name}</option>
                                            );
                                        })
                                    }
                                </select>
                                <select id={"service-time"}>
                                    <option value={"before"}>Before resea</option>
                                    <option value={"during"}>During resa</option>
                                    <option value={"after"}>After resa</option>
                                </select>
                                <textarea id={"service-description"}></textarea>
                                <button onClick={sendRequestService}>Request service</button>
                            </div> : ''
                    }

                    {
                        isReserved || isAdmin ?
                            <div className={"calendar-form-complete"}>
                                <h2>Monitoring of services</h2>
                                <div className={"table"}>
                                    <div className={"row"}>
                                        <div className={"row-content"}><h2>Name</h2></div>
                                        <div className={"row-content"}><h2>Date</h2></div>
                                        <div className={"row-content"}><h2>Status</h2></div>
                                    </div>
                                    {
                                        serviceUser.map((service, index) => {
                                            return (
                                                <div key={index} className={"row"}>
                                                    <div className={"row-content"}><h2>{service.service_name}</h2></div>
                                                    <div className={"row-content"}>
                                                        <h2>{service.from_datetime} - {service.to_datetime}</h2></div>
                                                    <div className={"row-content"}><h2>{service.status}</h2></div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div> : ''
                    }

                    <h1>Calendar</h1>
                    <div className={"calendar"}>
                        <Calendar
                            localizer={now}
                            events={eventCalendar.map((event, index) => {
                                return {
                                    start: new Date(event.from_datetime),
                                    end: new Date(event.to_datetime),
                                    title: isBail ? (data.created_by == event.user_email ? 'Baileur' : event.user_email) : 'Occupied'
                                };
                            })}
                            startAccessor="start"
                            endAccessor="end"
                            style={{height: 500}}/>
                    </div>
                    {
                        isBail ?
                            <div className={"calendar-form-complete"}>
                                <h2>Rental unavailable</h2>
                                <div className={"date-wrapper"}>
                                    <input type={"date"} id={"date-start"}/>
                                    <input type={"date"} id={"date-end"}/>
                                </div>
                                <label htmlFor={"auto-calendar-unavailable"}>Repeat</label>
                                <select id={"repeat-calendar-unavailable"}>
                                    <option value={"none"}>Never</option>
                                    <option value={"daily"}>Daily</option>
                                    <option value={"weekly"}>Weekly</option>
                                    <option value={"monthly"}>Monthly</option>
                                </select>
                                <button onClick={bailIsOccupied}>Apply</button>
                            </div>
                            : ''
                    }
                    {
                        isBail ?
                            <div className={"calendar-form-complete"}>
                                <h2>Delete occupation</h2>
                                {
                                    eventCalendar.length === 0 ?
                                        <h3>No location to delete</h3>
                                        :
                                        <div>
                                            <select id={"delete-location"}>
                                                {eventCalendar.map((event, index) => {
                                                    return (
                                                        <option
                                                            value={event.id}>{event.user_email} - {event.from_datetime.split('T')[0]} / {event.to_datetime.split('T')[0]}</option>
                                                    );
                                                })}
                                            </select>
                                            <button style={{background: '#c91919'}}
                                                    onClick={() => deleteOccupationBail(2)}>Delete
                                            </button>
                                        </div>
                                }
                            </div>
                            : ''
                    }

                    {
                        isReserved || isAdmin ?
                            (
                                <div className={"if-is-buy"}>
                                    {
                                        isBail ? '' :
                                            <div className={"notation"}>
                                                <h3>Notation</h3>
                                                <ul className={"stars"}>
                                                    {
                                                        [1, 2, 3, 4, 5].map((star, index) => {
                                                            return (
                                                                <li key={index} onClick={() => addNotation(star)}><i
                                                                    className="ai-star"></i></li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </div>

                                    }


                                    <div className={"container-message"}>
                                        <h3>Messages</h3>
                                        {
                                            isAdmin ?
                                                <select id={"message-select"} onChange={fetchMessagesForBail}>
                                                    {eventCalendar.map((event, index) => {
                                                        if (data.created_by !== event.user_email) {
                                                            return (
                                                                <option
                                                                    value={event.id}>{event.user_email} -
                                                                    {event.from_datetime.split('T')[0]} /
                                                                    {event.to_datetime.split('T')[0]}
                                                                </option>
                                                            );
                                                        }
                                                    })}
                                                </select>
                                                : ''
                                        }
                                        <div className={"messages"}>
                                            {
                                                isAdmin && messages.length != 0 ?
                                                    <button className={"delete-occupation-bail"}
                                                            onClick={() => deleteOccupationBail(1)}>Cancel this
                                                        location</button>
                                                    : ''
                                            }

                                            {
                                                messages.map((message, index) => {
                                                    return (
                                                        <div key={index} className={"message"}>
                                                            <p>{message.message}</p>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                        <input type={"text"} id={"message-input"}/>
                                        {
                                            isAdmin ?
                                                <i className={"ai-paper-airplane"} onClick={postMessageForBail}></i>
                                                :
                                                <i className={"ai-paper-airplane"} onClick={addMessage}></i>
                                        }
                                    </div>
                                </div>
                            )
                            : ''

                    }
                </div>
            </div>
        );
    }
}