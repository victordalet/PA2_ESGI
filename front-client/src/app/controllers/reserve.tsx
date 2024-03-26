import {
    ControllerProps,
    ControllerState,
    LocationOccupation,
    Subscription,
    SubscriptionUtilisation
} from "../@types/reserve";
import React from "react";
import {ReserveView} from "../views/reserve";
import {LocationDescription, LocationResponse} from "../@types/location";
import {ServiceResponse} from "../@types/service";
import ReserveViewModel from "../view-models/reserve";
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";


export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {


    private readonly id: number;
    private readonly type: boolean;
    private reserveViewModel: ReserveViewModel;
    private readonly idResa: number;
    private readonly isService: boolean;
    private readonly apiSubPath: string;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.idResa = 0;
        this.id = parseInt(document.location.href.split('?')[1].split('&')[0]);
        this.type = document.location.href.split('&a=')[1].includes('true');
        this.isService = false;
        this.apiSubPath = this.isService ? '/service' : '/location';
        if (this.type) {
            this.idResa = parseInt(document.location.href.split('&id2=')[1]);
            this.isAlsoReserved();
        }
        this.getNameFileBail();
        this.fetchLocation();
        this.getStartNotation();
        this.fetchService();
        this.fetchServiceOfLocation();
        this.fetchServiceReserved();
        this.getOccupationEvent();
        this.reserveViewModel = new ReserveViewModel();
    }


    state: ControllerState = {
        data: {} as LocationResponse,
        services: [],
        servicesGlobal: [],
        isReserved: false,
        notation: 0,
        messages: [],
        isBail: undefined,
        description: {} as LocationDescription,
        servicesSelected: [],
        eventCalendar: [],
        nameFiles: [],
    };


    private fetchService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/service', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: ServiceResponse[] = await response.json();
        data.filter((service) => {
            return service.type === 'USER';
        });
        this.setState({servicesGlobal: data});
    };

    private fetchServiceOfLocation = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/service/get-service-by-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: this.id
            })
        });
        const data = await response.json();
        this.setState({services: data});
    };


    public deleteLocation = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(apiPath + this.apiSubPath + '/' + this.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        document.location.href = '/location';
    };

    private isBail = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/user/token-to-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: { email: string } = await response.json();
        console.log(data.email, this.state.data.created_by);
        if (data.email === this.state.data.created_by) {
            this.setState({isBail: true});
        } else {
            this.setState({isBail: false});
        }

    };


    private fetchLocation = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + this.apiSubPath, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data = await response.json();
        this.setState({data: data.filter((location: ServiceResponse) => location.id === this.id)[0]});
        const description: LocationDescription = JSON.parse(data.filter((location: ServiceResponse) => location.id === this.id)[0].description);
        this.setState({description: description});
        this.isBail();
    };


    public addNotation = async (note: number) => {
        const API_PATH = process.env.API_HOST || 'http://localhost:3001';
        await fetch(API_PATH + this.apiSubPath + '/add-notation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: this.idResa,
                notation: note
            })
        });
        this.reserveViewModel.openPopupNote();
    };

    private isAlsoReserved = () => {
        const API_PATH = process.env.API_HOST || 'http://localhost:3001';
        fetch(API_PATH + this.apiSubPath + '/is-occupied-by-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: this.id
            })
        }).then(async (res) => {
            res.json().then((data: { is_occupied: boolean }) => {
                this.setState({isReserved: data.is_occupied});
                if (data.is_occupied) {
                    this.getMessages();
                }
            });
        });
    };

    private isOccupied = async (dateStart: string, dateEnd: string) => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + this.apiSubPath + '/is-occupied', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: this.id,
                from_datetime: dateStart,
                to_datetime: dateEnd
            })
        });
        return await response.json();
    };

    private getOccupationEvent = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + this.apiSubPath + '/get-occupation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: this.id
            })
        });
        const data: LocationOccupation[] = await response.json();
        this.setState({eventCalendar: data});
    };

    public postFileBail = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const file = document.querySelector<HTMLInputElement>('#file-input');
        if (file && file.files) {
            const formData = new FormData();
            formData.append('file', file.files[0]);
            const name = `location-${this.id}-${file.files[0].name}`;
            formData.append('name', name);
            await fetch(`${apiPath}/file`, {
                method: 'POST',
                headers: {
                    'authorization': localStorage.getItem('token') || ''
                },
                body: formData
            });
            document.location.reload();
        }

    };

    public getNameFileBail = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/file/get-name-files`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                file: `location-${this.id}`
            })
        });
        const data = await response.json();
        console.log(data);
        this.setState({nameFiles: data.data});
    };

    public downloadFileBail = async (name: string) => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/file&name=${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data = await response.blob();
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
    };


    public getStartNotation = () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + this.apiSubPath + '/get-notation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: this.id
            })
        }).then((res) => {
            res.json().then((data) => {
                this.setState({notation: data});
            });
        });
    };

    public fetchReservations = async () => {
        const dateStart = document.querySelector<HTMLInputElement>('#date-start');
        const dateEnd = document.querySelector<HTMLInputElement>('#date-end');
        if (dateStart !== null && dateEnd !== null) {
            if (!this.reserveViewModel.verifyDate(dateStart.value, dateEnd.value)) {
                this.reserveViewModel.openPopupBadDate();
            } else if (!await this.isOccupied(dateStart.value, dateEnd.value)) {
                const apiPath = process.env.API_HOST || 'http://localhost:3001';
                const response = await fetch(apiPath + this.apiSubPath + '/occupation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': localStorage.getItem('token') || ''
                    },
                    body: JSON.stringify({
                        location_id: this.id,
                        from_datetime: dateStart.value,
                        to_datetime: dateEnd.value
                    })
                });
                const data = await response.json();
                await this.reservedNewService(data.id);
                document.location.href = '/resa';
            } else {
                this.reserveViewModel.openPopupBadDate();
            }

        } else {
            this.reserveViewModel.openPopupBadDate();
        }
    };

    private getMessages = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + this.apiSubPath + '/get-messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: this.idResa
            })
        });
        const messages = await response.json();
        this.setState({messages: messages[0]});
    };

    public addMessage = async () => {
        const message = document.querySelector<HTMLInputElement>('#message-input');
        if (message !== null) {
            const apiPath = process.env.API_HOST || 'http://localhost:3001';
            await fetch(apiPath + this.apiSubPath + '/add-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token') || ''
                },
                body: JSON.stringify({
                    location_occupation_id: this.idResa,
                    message: message.value
                })
            });
            document.location.reload();
        }
    };

    public deleteOccupation = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(apiPath + this.apiSubPath + '/occupation', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: this.idResa
            })
        });
        document.location.href = '/location';
    };

    public deleteOccupationBail = async () => {
        const idLocation = document.querySelector<HTMLInputElement>('#message-select')?.value;
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(apiPath + this.apiSubPath + '/occupation', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: idLocation
            })
        });
        document.location.reload();
    };

    private fetchIsSubscribed = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/subscription/is_subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: Subscription[] = await response.json();
        if (data.length === 0) {
            return 0;
        }
        console.log(data);
        return data[0].price;
    };

    private fetchLastDateFreeService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/subscription/last_date_free_service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: SubscriptionUtilisation[] = await response.json();
        if (data.length === 0) {
            const dateToReturn = new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000;
            return new Date(dateToReturn).toISOString().split('T')[0];
        }
        return data.sort((a, b) => new Date(b.last_date_free_service).getTime() - new Date(a.last_date_free_service).getTime())[0].last_date_free_service;
    };

    public fetchMessagesForBail = async () => {
        const idLocation = document.querySelector<HTMLInputElement>('#message-select')?.value;
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + this.apiSubPath + '/get-messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: idLocation
            })
        });
        const messages = await response.json();
        this.setState({messages: messages[0]});
    };

    public postMessageForBail = async () => {
        const idLocation = document.querySelector<HTMLInputElement>('#message-select')?.value;
        const message = document.querySelector<HTMLInputElement>('#message-input');
        if (message !== null) {
            const apiPath = process.env.API_HOST || 'http://localhost:3001';
            await fetch(apiPath + this.apiSubPath + '/add-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token') || ''
                },
                body: JSON.stringify({
                    location_occupation_id: idLocation,
                    message: message.value
                })
            });
            await this.fetchMessagesForBail();
        }
    };

    public downloadFactureBail = async () => {
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
        const services = this.state.services;
        const number_user_locate = this.state.eventCalendar.length;
        let positionYFinal = 9;
        services.map((s, i) => {
            page.drawText('Service ' + (i + 1) + ' : ' + s.name + ' - ' + s.price + '€ ', {
                x: 50,
                y: height - (positionYFinal + i) * fontSize,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),

            });
            positionYFinal += 2;
        });
        positionYFinal += 3;
        page.drawText(`Multiplication des services par  : ${number_user_locate} (nb de locations) `, {
            x: 50,
            y: height - (positionYFinal) * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        positionYFinal += 2;
        page.drawLine({
            start: {x: 50, y: height - positionYFinal * fontSize},
            end: {x: width - 50, y: height - positionYFinal * fontSize},
            thickness: 2,
            color: rgb(0, 0, 0),
        });
        positionYFinal += 2;
        const serviceTotalPrice = services.reduce((acc, service) => acc + service.price, 0);
        const totalPrice = serviceTotalPrice * number_user_locate;
        page.drawText(`Total : ${totalPrice} €`, {
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

    public downloadFacture = async () => {
        const isSubscribed = await this.fetchIsSubscribed();
        let lastDateFreeService = '';
        if (isSubscribed !== 0) {
            lastDateFreeService = await this.fetchLastDateFreeService();
        }
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
        const locationName: string = this.state.data.name;
        const locationAddress: string = this.state.data.address;
        const locationCreatedBy: string = this.state.data.created_by || '';
        const locationDescription: LocationDescription = this.state.description;
        const locationPrice: number = this.state.data.price;
        page.drawText('Location : ' + locationName, {
            x: 50,
            y: height - 12 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        page.drawText('Adresse : ' + locationAddress, {
            x: 50,
            y: height - 14 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        const textDescription: string = 'type Concierge: ' + locationDescription.typeConcierge +
            ' - type Location: ' + locationDescription.typeLocation +
            ' - type Propriété: ' + locationDescription.type +
            ' - Nombre de chambre: ' + locationDescription.numberRoom;
        page.drawText('Description : ' + textDescription.substring(0, 70), {
            x: 50,
            y: height - 16 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        page.drawText(textDescription.substring(70, 180), {
            x: 50,
            y: height - 17 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        page.drawText('Prix : ' + locationPrice + '€', {
            x: 50,
            y: height - 19 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        page.drawText('Créé par : ' + locationCreatedBy, {
            x: 50,
            y: height - 21 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });

        const services: ServiceResponse[] = this.state.servicesSelected;
        this.state.services.map((service) => {
            services.push(service);
        });
        page.drawLine({
            start: {x: 50, y: height - 22 * fontSize},
            end: {x: width - 50, y: height - 22 * fontSize},
            thickness: 2,
            color: rgb(0, 0, 0),
        });

        let y: number = height - 24 * fontSize;
        page.drawText('Services :', {
            x: 50,
            y: y,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        y -= 2 * fontSize;
        services.map((service) => {
            page.drawText(service.name + ' : ' + service.price, {
                x: 50,
                y: y,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });
            y -= 2 * fontSize;
        });
        page.drawLine({
            start: {x: 50, y: y},
            end: {x: width - 50, y: y},
            thickness: 2,
            color: rgb(0, 0, 0),
        });
        y -= 2 * fontSize;
        if (isSubscribed == 19 && new Date(lastDateFreeService).getTime() < new Date().getTime() - 3 * 30 * 24 * 60 * 60 * 1000) {
            page.drawText('1 service gratuit', {
                x: 50,
                y: y,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });
            y -= 2 * fontSize;
        } else if (isSubscribed == 10 && new Date(lastDateFreeService).getTime() < new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000) {
            page.drawText('1 service gratuit', {
                x: 50,
                y: y,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });
            y -= 2 * fontSize;
        }
        if (isSubscribed == 19) {
            page.drawText('Réduction de 5 % sur les services', {
                x: 50,
                y: y,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });
            y -= 2 * fontSize;
        }
        let totalPrice = locationPrice;
        services.map((service) => {
            if (isSubscribed == 19) {
                totalPrice += service.price * 0.95;
            } else {
                totalPrice += service.price;
            }
        });
        if (isSubscribed == 19 && new Date(lastDateFreeService).getTime() < new Date().getTime() - 3 * 30 * 24 * 60 * 60 * 1000) {
            totalPrice -= services[0].price;
        } else if (isSubscribed == 10 && new Date(lastDateFreeService).getTime() < new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000) {
            totalPrice -= services[0].price;
        }
        page.drawText(`Total : ${totalPrice} €`, {
            x: 50,
            y: y,
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

    private reservedNewService = async (id_reservation: number) => {
        const cardElement = document.querySelectorAll<HTMLDivElement>('.services-new .card');
        console.log(cardElement);
        if (cardElement.length === 0) {
            return;
        }
        const listIdCard: number[] = [];
        this.state.servicesGlobal.map((service, index) => {
            if (!this.state.services.find((s) => s.id === service.id)) {
                listIdCard.push(service.id);
            }
        });

        await cardElement.forEach(async (card, index) => {
            if (card.classList.contains('active')) {
                console.log('fetch');
                const apiPath = process.env.API_HOST || 'http://localhost:3001';
                await fetch(apiPath + '/service/service-by-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': localStorage.getItem('token') || ''
                    },
                    body: JSON.stringify({
                        location_occupation_id: id_reservation,
                        service_id: listIdCard[index]
                    })
                });
            }
        });

    };

    private fetchServiceReserved = async () => {
        if (this.idResa === 0) {
            return;
        }
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/service/get-service-by-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_id: this.id,
                location_occupation_id: this.idResa
            })
        });
        const data = await response.json();
        this.setState({servicesSelected: data});
    };

    render() {

        if (this.state.isBail === undefined && this.state.services.length === 0) {
            return <Loading/>;
        }

        return <ReserveView
            isService={this.isService}
            fetchMessagesForBail={this.fetchMessagesForBail}
            postMessageForBail={this.postMessageForBail}
            eventCalendar={this.state.eventCalendar}
            servicesSelected={this.state.servicesSelected}
            addService={this.reserveViewModel.addService}
            servicesGlobal={this.state.servicesGlobal}
            description={this.state.description}
            deleteLocation={this.deleteLocation}
            isBail={this.state.isBail}
            downloadFacture={this.downloadFacture}
            deleteOccupation={this.deleteOccupation}
            messages={this.state.messages}
            addMessage={this.addMessage}
            notation={this.state.notation}
            addNotation={this.addNotation}
            data={this.state.data}
            services={this.state.services}
            fetchReservations={this.fetchReservations}
            isReserved={this.state.isReserved}
            downloadFactureBail={this.downloadFactureBail}
            nameFiles={this.state.nameFiles}
            downloadFileBail={this.downloadFileBail}
            postFileBail={this.postFileBail}
            deleteOccupationBail={this.deleteOccupationBail}/>;
    }

}