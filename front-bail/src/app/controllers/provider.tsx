import React from "react";
import {ControllerProps, ControllerState, EventCalendar} from "../@types/provider";
import {haveToken} from "../../security/token";
import {ProviderView} from "../views/provider";

export default class ProviderController extends React.Component<
    ControllerProps,
    ControllerState> {

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.isYourService();
        this.fetchService();
    }


    state: ControllerState = {
        eventCalendar: []
    };

    private fetchService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/service/get-service-by-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                service_id: document.location.href.split('id=')[1]
            })
        });
        const data: any[] = await response.json();
        const eventCalendarTemp: EventCalendar[] = [];
        data.forEach((service) => {
            eventCalendarTemp.push({
                start: service.from_datetime,
                end: service.to_datetime,
                title: service.title
            });
        });
        this.setState({eventCalendar: eventCalendarTemp});
    };

    private isYourService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(`${apiPath}/service/your`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                id: document.location.href.split('id=')[1]
            })
        });
        const data: { accept: boolean } = await res.json();
        if (!data.accept) {
            document.location.href = "/resources";
        }
    };

    render() {
        return <ProviderView
            eventCalendar={this.state.eventCalendar}
        />;
    }

}