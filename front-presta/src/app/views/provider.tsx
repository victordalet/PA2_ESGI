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