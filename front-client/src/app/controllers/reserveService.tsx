import React from "react";
import {aboutCommission, ControllerProps, ControllerState} from "../@types/reserveService";
import ReserveServiceView from "../views/reserveService";
import {ServiceResponse} from "../@types/service";
import ReserveServiceViewModel from "../view-models/reserveService";
import {PDFDocument, rgb, StandardFonts} from "pdf-lib";
import {LocationOccupation} from "../@types/reserve";
import {Loading} from "../../components/loading";
import {ReserveServiceModel} from "../model/reserveService";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    private readonly id: number;
    private readonly reserveServiceModel: ReserveServiceModel;
    public reserveServiceViewModel: ReserveServiceViewModel;
    private commissionStats: aboutCommission[];

    constructor(props: ControllerProps) {
        super(props);
        this.reserveServiceModel = new ReserveServiceModel();
        this.id = parseInt(document.location.href.split('?')[1].split('&')[0]);
        this.commissionStats = [
            {price_min: 1, price_max: 5, commission: 20},
            {price_min: 5, price_max: 45, commission: 15},
            {price_min: 45, price_max: 75, commission: 11},
            {price_min: 75, price_max: 140, commission: 9},
            {price_min: 140, price_max: 9999, commission: 5},
        ];
        this.reserveServiceViewModel = new ReserveServiceViewModel();
        this.fetchService();
        this.getLocationsAssociated();
    }

    state: ControllerState = {
        service: {} as ServiceResponse,
        isCreator: undefined,
        location: [],
        eventCalendar: []
    };

    private fetchService = async () => {
        const data: ServiceResponse[] = await this.reserveServiceModel.fetchService();
        const service = data.find((s) => s.id === this.id);
        if (service) {
            this.setState({service: service});
        }
        await this.isCreator();
    };

    private isCreator = async () => {
        const data = await this.reserveServiceModel.isCreator();
        if (data.email === this.state.service.created_by) {
            this.setState({isCreator: true});
        } else {
            this.setState({isCreator: false});
        }
    };

    public postNotation = async (notation: number) => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        await fetch(apiPath + '/service/notation', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                id: this.id,
                notation: notation,
                type: this.state.service.type
            })
        });
        this.reserveServiceViewModel.openPopup(0);
    };

    public deleteService = async () => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        await fetch(apiPath + '/service/' + this.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        window.location.href = '/service';
    };

    public generateFacture = async () => {
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
        const numberLocationUserServices = 5;
        page.drawText('Numéro de la facture : ' + this.state.service.id, {
            x: 50,
            y: height - 12 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        const date = new Date();
        page.drawText('Date : ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(), {
            x: 50,
            y: height - 14 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        page.drawText('Client : ' + this.state.service.created_by, {
            x: 50,
            y: height - 16 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        const price = this.state.service.price;
        const commission = this.commissionStats.find((c) => c.price_min <= price && c.price_max > price);
        const commissionValue = (price * numberLocationUserServices) * (commission?.commission || 0) / 100;
        const total = (price * numberLocationUserServices) - commissionValue;
        page.drawText('Commission : ' + commissionValue + '€', {
            x: 50,
            y: height - 18 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        page.drawText('Total : ' + total + '€', {
            x: 50,
            y: height - 20 * fontSize,
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

    public deleteLocation = async (locationID: number) => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        await fetch(apiPath + '/service/remove-location-by-service', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: locationID,
                service_id: this.id,
                type: this.state.service.type
            })
        });
    };

    public getLocationsAssociated = async () => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const response = await fetch(apiPath + '/service/get-location-by-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                service_id: this.id,
                type: this.state.service.type
            })
        });
        try {
            const data = await response.json();
            this.setState({location: data});
        } catch (e) {
            console.log(e);
        }
    };

    private getOccupationEvent = async () => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        for (const location of this.state.location) {
            const response = await fetch(apiPath + 'location/get-occupation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token') || ''
                },
                body: JSON.stringify({
                    location_id: location.id
                })
            });
            const data: LocationOccupation[] = await response.json();
            this.setState({
                eventCalendar: this.state.eventCalendar.concat(data.map((d) => {
                    return {...d, location_name: location.name};
                }))
            });
        }
    };

    render() {

        if (this.state.isCreator === undefined) {
            return <Loading/>;
        }

        return <ReserveServiceView
            service={this.state.service}
            postNotation={this.postNotation}
            isCreator={this.state.isCreator}
            deleteService={this.deleteService}
            generateFacture={this.generateFacture}
            deleteLocation={this.deleteLocation}
            location={this.state.location}
            eventCalendar={this.state.eventCalendar}/>;
    }

}