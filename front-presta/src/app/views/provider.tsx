import React from "react";
import {ViewProps} from "../@types/provider";
import {Navbar} from "../../components/navbar";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

export class ProviderView extends React.Component<ViewProps> {


    public render() {

        const {
            eventCalendar,
            downloadFacture
        } = this.props;

        const now = momentLocalizer(moment);

        return (
            <div>
                <Navbar/>

                <h1 style={{textAlign: 'center'}}>Your availability</h1>

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
                        eventPropGetter={(event, start, end, isSelected) => {
                            const newStyle = {
                                backgroundColor: "red",
                                color: 'white',
                                borderRadius: "0px",
                                border: "none"
                            };

                            if (event.title === "good") {
                                newStyle.backgroundColor = "blue";
                            }

                            if (event.title === "valid") {
                                newStyle.backgroundColor = "green";
                            }

                            return {
                                className: "",
                                style: newStyle
                            };
                        }}
                        startAccessor="start"
                        endAccessor="end"
                        style={{height: 500}}/>
                </div>

                <button
                    onClick={downloadFacture}
                    className={"button-facture-provider"}>Facture
                </button>


            </div>
        );
    }
}