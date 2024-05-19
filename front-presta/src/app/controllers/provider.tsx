import React from "react";
import {ControllerProps, ControllerState, EventCalendar} from "../@types/provider";
import {haveToken} from "../../security/token";
import {ProviderView} from "../views/provider";
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import {ProviderModel} from "../model/provider";

export default class ProviderController extends React.Component<
    ControllerProps,
    ControllerState> {


    providerModel: ProviderModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.providerModel = new ProviderModel();
        this.providerModel.isYourService();
        this.fetchService();
    }


    state: ControllerState = {
        eventCalendar: []
    };

    private fetchService = async () => {
        const data: any[] = await this.providerModel.fetchService();
        const eventCalendarTemp: EventCalendar[] = [];
        console.log(data);
        data.forEach((service) => {
            eventCalendarTemp.push({
                start: service.from_datetime,
                end: service.to_datetime,
                title: service.description,
                price: service.price,
                city: service.city,
                user_email: service.email,
                latitude: service.latitude,
                longitude: service.longitude
            });
        });
        this.setState({eventCalendar: eventCalendarTemp});
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
            addOccupation={this.providerModel.addOccupation}
            downloadFacture={this.downloadFacture}
            eventCalendar={this.state.eventCalendar}
        />;
    }

}