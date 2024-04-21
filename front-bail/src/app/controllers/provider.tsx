import React from "react";
import {ControllerProps, ControllerState, EventCalendar} from "../@types/provider";
import {haveToken} from "../../security/token";
import {ProviderView} from "../views/provider";
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';

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

    public downloadFacture = async () => {
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const page = pdfDoc.addPage();
        const {width, height} = page.getSize();
        let fontSize = 30;
        page.drawLine({
            start: {x: 50, y: height - 2 * fontSize},
            end: {x: width - 50, y: height - 2 * fontSize},
            thickness: 2,
            color: rgb(0, 0, 0),
        });
        page.drawText('Facture', {
            x: width / 2 - 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        page.drawLine({
            start: {x: 50, y: height - 5 * fontSize},
            end: {x: width - 50, y: height - 5 * fontSize},
            thickness: 2,
            color: rgb(0, 0, 0),
        });
        fontSize = 15;
        const positionYFinal = 15;
        const totalPriceFinal = 0;
        this.state.eventCalendar.forEach((event, index) => {
            const positionY = 5 + index;
            const thisMonth = new Date().getMonth();
            const thisYear = new Date().getFullYear();
            const date = new Date(event.start);
            if (!(date.getMonth() !== thisMonth || date.getFullYear() !== thisYear)) {
                page.drawText(`${event.title} : ${event.price} €`, {
                    x: 50,
                    y: height - (positionY) * fontSize,
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                });
            }

        });
        page.drawText(`Total : ${totalPriceFinal} €`, {
            x: 50,
            y: height - (positionYFinal) * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], {type: 'application/pdf'});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'facture.pdf';
        link.click();
    };

    render() {
        return <ProviderView
            downloadFacture={this.downloadFacture}
            eventCalendar={this.state.eventCalendar}
        />;
    }

}