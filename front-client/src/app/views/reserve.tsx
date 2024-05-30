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
            paidPresentation,
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
            serviceUser,
            idResa,
            updateServiceSelected,
            serviceSelected,
            locationOccupationPaiement,
            postFileLocationOccupation,
            fileNameOccupation,
            downloadFactureService
        } = this.props;

        let isToday = false;
        let status = '';

        eventCalendar.forEach((event) => {
            if (isReserved && event.id == idResa && event.is_pay == 0) {
                isToday = true;
            }
            if (isReserved && event.id == idResa) {
                status = event.status;
            }
        });


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
                    {
                        isReserved ? <h1>Satus : {status}</h1> : ''
                    }
                    {
                        status === 'accepted' && isReserved ?
                            <button id={"pay"} onClick={locationOccupationPaiement}
                            >Pay
                            </button>
                            : ''
                    }
                    <div className={"calendar-form-complete"} id={"container-picture"}
                         style={{
                             marginTop: '50px',
                             height: '40vh',
                             backgroundSize: 'cover',
                             width: '40%',
                             padding: '20px'
                         }}>

                    </div>
                    <div id={"container-picture-all"}></div>
                    <div className={"description"}>
                        <div className={"description-text"}>
                            {
                                description ?
                                    (
                                        <div>
                                            <h3><span>Description:</span>{data.description}</h3>
                                            <h3><span>Address :</span>{description.address}</h3>
                                            <h3><span>Country :</span>{description.country}</h3>
                                            <h3><span>Type :</span>{description.type}</h3>
                                            <h3><span>Type de location :</span>{description.typeLocation}</h3>
                                            <h3><span>Surface :</span>{description.surface}</h3>
                                            <h3><span>Nb Rooms :</span>{description.room}</h3>
                                            <h3><span>Nb Kitchen :</span>{description.kitchen}</h3>
                                            <h3><span>Nb Bathroom :</span>{description.bathroom}</h3>
                                            <h3><span>Nb Parking places :</span>{description.parking}</h3>


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
                            {
                                isAdmin ?
                                    <h3 id={"contact"}><i className="ai-paper-airplane"></i>{data.created_by}</h3> : ''
                            }

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
                                isBail || isAdmin ?
                                    (
                                        <div className={"reservation"}>
                                            <button id={"cancel"} onClick={deleteLocation}
                                                    style={{background: '#c91919', marginBottom: '20px'}}>Delete
                                            </button>
                                            {
                                                isBail ?
                                                    <div>
                                                        <button id={"facture"} onClick={downloadFactureBail}>My
                                                            facture
                                                        </button>
                                                    </div> : ''

                                            }
                                        </div>
                                    )
                                    :

                                    (!isReserved ?
                                        '' :
                                        (
                                            <div className={"reservation"}>
                                                {
                                                    status !== 'finish' ?
                                                        <button id={"cancel"} onClick={deleteOccupation}
                                                                style={{
                                                                    marginBottom: '20px',
                                                                    background: '#c91919'
                                                                }}>Cancel
                                                        </button> : ''
                                                }
                                                <button id={"facture"} onClick={downloadFacture}>My facture</button>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>
                    {
                        !isReserved && !isBail && !isAdmin ?
                            <div className={"calendar-form-complete"}
                                 style={{marginTop: '50px', width: '40%', padding: '20px'}}>
                                <h2>Reservation</h2>
                                <div className={"date-wrapper"}>
                                    <input type={"date"} id={"date-start"}/>
                                    <input type={"date"} id={"date-end"}/>
                                </div>
                                <h3>Your status</h3>
                                <select id={"status-reservation"}>
                                    <option value={"student"}>Student</option>
                                    <option value={"worker"}>Worker</option>
                                    <option value={"student-with-guarantor"}>Student with guarantor</option>
                                </select>
                                <h3>Your salary</h3>
                                <input type={"number"} id={"salary"}/>
                                <h3>Present your self</h3>
                                <textarea id={"presentation"}></textarea>
                                <button onClick={fetchReservations}>Reserve</button>
                            </div>
                            : ''
                    }

                    {
                        isReserved ?
                            <div className={"calendar-form-complete"}
                                 style={{marginTop: '50px', width: '60%', padding: '20px'}}>
                                <h2>Add documents</h2>
                                <div className={"resources-files"}>
                                    {
                                        fileNameOccupation.map((name, index) => {
                                            return (
                                                <div key={index}>
                                                    <h3>{name}</h3>
                                                    <i className="ai-download"
                                                       onClick={() => downloadFileBail(name)}></i>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                <input type={"file"} id={"file-occupation-input"}/>
                                <button onClick={postFileLocationOccupation}>Send</button>
                            </div>
                            : ''
                    }


                    {
                        isReserved ?
                            <div className={"calendar-form-complete"}
                                 style={{marginTop: '100px', width: '40%', padding: '20px'}}>
                                <h2>Take Services</h2>
                                <select id={"service-name"} onChange={updateServiceSelected}>
                                    {
                                        services.map((service, index) => {
                                            return (
                                                <option key={service.name} value={service.name}>{service.name}</option>
                                            );
                                        })
                                    }
                                </select>
                                {
                                    serviceSelected === 'taxi' ?
                                        <div>
                                            <input type={"text"} id={"service-taxi-start"} placeholder={"Start"}/>
                                            <input type={"text"} id={"service-taxi-stop"} placeholder={"Arrival"}/>
                                            <input type={"datetime-local"} id={"service-taxi-arrival"}
                                                   placeholder={"Arrival time"}/>
                                        </div>
                                        : ''
                                }
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
                        isReserved ?
                            <div className={"calendar-form-complete"}>
                                <h2>Monitoring of services</h2>
                                <div className={"table"}>
                                    <div className={"row"}>
                                        <div className={"row-content"}><h2>Name</h2></div>
                                        <div className={"row-content"}><h2>Date</h2></div>
                                        <div className={"row-content"}><h2>Price</h2></div>
                                        <div className={"row-content"}><h2>Status</h2></div>
                                        <div className={"row-content"}><h2>Facture</h2></div>
                                        <div className={"row-content"}><h2>Pay</h2></div>
                                    </div>
                                    {
                                        serviceUser.map((service, index) => {
                                            return (
                                                <div key={index} className={"row"}>
                                                    <div className={"row-content"}><h2>{service.service_name}</h2></div>
                                                    <div className={"row-content"}>
                                                        <h2>from {new Date(service.from_datetime).toLocaleDateString('fr-FR') + ' ' + new Date(service.from_datetime).toLocaleTimeString('fr-FR')} to {new Date(service.to_datetime).toLocaleDateString('fr-FR') + ' ' + new Date(service.to_datetime).toLocaleTimeString('fr-FR')}
                                                        </h2></div>
                                                    <div className={"row-content"}><h2>{service.price} €</h2></div>
                                                    <div className={"row-content"}><h2>{service.status}</h2></div>
                                                    <div className={"row-content"}>
                                                        <button
                                                            onClick={() => downloadFactureService(service.service_name, new Date(service.from_datetime).toLocaleDateString('fr-FR'), service.price)}
                                                        >Download
                                                        </button>
                                                    </div>
                                                    <div className={"row-content"}>
                                                        <button
                                                            onClick={() => {
                                                                if (service.status === 'accepted' || service.status === 'valid') {
                                                                    paidPresentation(service.id, service.service_name, service.price);
                                                                } else {
                                                                    if (service.status === 'pay') {
                                                                        alert('Service already paid');
                                                                    } else {
                                                                        alert('Service not accepted');
                                                                    }
                                                                }
                                                            }}
                                                        >Pay
                                                        </button>
                                                    </div>
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
                                    title: isBail ? (data.created_by == event.user_email ? 'Baileur' : event.user_email) :
                                        isReserved && event.id == idResa ? 'Your Reservation' : 'Occupied'
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