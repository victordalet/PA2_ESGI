import {ViewProps} from "../@types/provider";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

export class ProviderView extends React.Component<ViewProps> {
    render() {

        const {
            service,
            provider,
            user,
            filterUserByService,
            reservedService,
            eventCalendar,
            updateCalendar
        } = this.props;

        const now = momentLocalizer(moment);

        return <div>
            <Navbar/>
            <div className={"container-services-global"}>
                <div className={"container-services"}>
                    <select onChange={filterUserByService} id={"service"} name={"service"}>
                        {
                            service.map((service) => {
                                return <option value={service.name}>{service.name}</option>;
                            })
                        }
                    </select>
                </div>
                <div className={"step2-table"}>
                    <div className="table">
                        <div className={"table-header"}>
                            {
                                ["LOCATION CITY", "OCCUPANT"].map((data) => (
                                    <div className="header__item"><a className="filter__link"> {data}</a></div>
                                ))
                            }
                        </div>
                        <div className={'table-content'}>
                            {
                                user.map(dataLine => (
                                    <div className={'table-row'}>
                                        {[dataLine.city,
                                            dataLine.user_email
                                        ].map(dataColumn => (
                                            <div className="table-data">{dataColumn}</div>
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="table">
                        <div className={"table-header"}>
                            {
                                ["PROVIDER", "CITY"].map((data) => (
                                    <div className="header__item"><a className="filter__link"> {data}</a></div>
                                ))
                            }
                        </div>
                        <div className={'table-content'}>
                            {
                                provider.map(dataLine => (
                                    <div className={'table-row'} style={{cursor: 'pointer'}} onClick={() => updateCalendar(dataLine.id)}>
                                        {[dataLine.name,
                                            dataLine.city
                                        ].map(dataColumn => (
                                            <div className="table-data">{dataColumn}</div>
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={"calendar"}>
                    <Calendar
                        localizer={now}
                        events={eventCalendar.map((event, index) => {
                            return {
                                start: new Date(event.start),
                                end: new Date(event.end),
                                title: event.title
                            };
                        })}
                        startAccessor="start"
                        endAccessor="end"
                        style={{height: 500}}/>
                </div>
                <div className={"form-reservation"}>
                    <select id={"location-occupation"} name={"location-occupation"}>
                        {
                            user.map((location) => {
                                return <option
                                    value={location.location_occupation_id}>{location.user_email}</option>;
                            })
                        }
                    </select>
                    <select id={"service"} name={"service"}>
                        {
                            service.map((service) => {
                                return <option value={service.id}>{service.name}</option>;
                            })
                        }
                    </select>
                    <input type={"datetime-local"} id={"from-datetime"} name={"from"}/>
                    <input type={"datetime-local"} id={"to-datetime"} name={"to"}/>
                    <button onClick={reservedService}>Reserve</button>
                </div>
            </div>
        </div>;
    }
}