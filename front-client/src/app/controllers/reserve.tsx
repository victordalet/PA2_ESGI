import {
    ControllerProps,
    ControllerState,
    LocationOccupation, ServiceUser,
    UserRequest
} from "../@types/reserve";
import React from "react";
import {ReserveView} from "../views/reserve";
import {LocationDescription, LocationResponse} from "../@types/location";
import {ServiceResponse} from "../@types/service";
import ReserveViewModel from "../view-models/reserve";
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";
import {ReserveModel} from "../model/reserve";


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
    private readonly reserveModel: ReserveModel;
    private isProvider: boolean;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.idResa = 0;
        this.id = parseInt(document.location.href.split('?')[1].split('&')[0]);
        this.type = document.location.href.split('&a=')[1].includes('true');
        this.isService = false;
        this.isProvider = false;
        this.apiSubPath = this.isService ? '/service' : '/location';
        this.reserveModel = new ReserveModel(this.idResa, this.apiSubPath, this.id);
        this.reserveViewModel = new ReserveViewModel();
        if (this.type) {
            this.isProvider = document.location.href.includes('provider');
            this.idResa = parseInt(document.location.href.split("&id2=")[1]);
            this.reserveModel = new ReserveModel(this.idResa, this.apiSubPath, this.id);
            this.isAlsoReserved();
        }
        this.verifIsAdmin();
        this.reserveModel.getNameFileBail();
        this.fetchLocation();
        this.getStartNotation();
        this.fetchJob();
        this.fetchServiceReserved();
        this.getOccupationEvent();
        this.getLocationsOccupationRequestInfor();
        this.fetchServiceUser();
        this.displayPicture();
        this.getFileNameLocationOccupation();
    }

    state: ControllerState = {
        data: {} as LocationResponse,
        services: [],
        servicesGlobal: [],
        isReserved: false,
        notation: 0,
        messages: [],
        isBail: undefined,
        isAdmin: false,
        description: {} as LocationDescription,
        servicesSelected: [],
        eventCalendar: [],
        nameFiles: [],
        userRequestService: [],
        serviceUser: [],
        serviceSelected: "",
        fileNameOccupation: [],
    };



    private fetchServiceUser = async () => {
        this.setState({serviceUser: await this.reserveModel.getServiceByLocationId()});
    };


    private getLocationsOccupationRequestInfor = async () => {
        let data: UserRequest[] = await this.reserveModel.getLocationsOccupationRequestInfor();
        data = data.filter((user) => user.status === 'done' && user.location_occupation_id === this.idResa);
        this.setState({userRequestService: data});
    };


    public bailIsOccupied = async () => {
        const dateStart = document.querySelector<HTMLInputElement>("#date-start");
        const dateEnd = document.querySelector<HTMLInputElement>("#date-end");
        const repeat = document.querySelector<HTMLSelectElement>("#repeat-calendar-unavailable");
        if (dateStart !== null && dateEnd !== null && repeat !== null) {
            if (!this.reserveViewModel.verifyDate(dateStart.value, dateEnd.value)) {
                this.reserveViewModel.openPopupBadDate();
            } else {
                const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
                await fetch(apiPath + this.apiSubPath + "/occupation-bail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: localStorage.getItem("token") || "",
                    },
                    body: JSON.stringify({
                        location_id: this.id,
                        from_datetime: dateStart.value,
                        to_datetime: dateEnd.value,
                        repeat: repeat.value,
                    }),
                });
                document.location.reload();
            }
        } else {
            this.reserveViewModel.openPopupBadDate();
        }
    };

    private isBail = async () => {
        const data = await this.reserveModel.isBail();
        if (data.email === this.state.data.created_by) {
            this.setState({isBail: true});
        } else {
            this.setState({isBail: false});
        }
    };

    private fetchLocation = async () => {
        const data: any[] = await this.reserveModel.fetchLocation();
        this.setState({
            data: data.filter(
                (location: ServiceResponse) => location.id === this.id
            )[0],
        });
        this.reserveModel.setPrice(data.filter(
                (location: ServiceResponse) => location.id === this.id
            )[0].price);
        const description: LocationDescription = JSON.parse(
            data.filter((location: ServiceResponse) => location.id === this.id)[0]
                .description_json
        );
        this.setState({description: description});
        await this.isBail();
    };

    public addNotation = async (note: number) => {
        await this.reserveModel.addNotation(note);
        this.reserveViewModel.openPopupNote();
    };

    private isAlsoReserved = async () => {
        const response = await this.reserveModel.isAlsoReserved(this.idResa);
        response.json().then((data: { is_occupied: boolean }) => {
            this.setState({isReserved: data.is_occupied});
            if (data.is_occupied) {
                this.getMessages();
            }
        });
    };


    private getOccupationEvent = async () => {
        const data: LocationOccupation[] = await this.reserveModel.getOccupationEvent();
        const maxToRepeat = 10;
        const dataArrayToAppend: LocationOccupation[] = [];
        data.map((occupation) => {
            if (occupation.repeat === "weekly") {
                Array.from({length: maxToRepeat}, (_, i) => {
                    const date = new Date(occupation.from_datetime);
                    date.setDate(date.getDate() + 7 * (i + 1));
                    const dateEnd = new Date(occupation.to_datetime);
                    dateEnd.setDate(dateEnd.getDate() + 7 * (i + 1));
                    dataArrayToAppend.push({
                        id: occupation.id,
                        from_datetime: date.toISOString().split("T")[0],
                        to_datetime: dateEnd.toISOString().split("T")[0],
                        user_email: occupation.user_email,
                        repeat: occupation.repeat,
                        is_pay: occupation.is_pay,
                        status: occupation.status,
                    });
                });
            } else if (occupation.repeat === "monthly") {
                Array.from({length: maxToRepeat}, (_, i) => {
                    const date = new Date(occupation.from_datetime);
                    date.setMonth(date.getMonth() + (i + 1));
                    const dateEnd = new Date(occupation.to_datetime);
                    dateEnd.setMonth(dateEnd.getMonth() + (i + 1));
                    dataArrayToAppend.push({
                        id: occupation.id,
                        from_datetime: date.toISOString().split("T")[0],
                        to_datetime: dateEnd.toISOString().split("T")[0],
                        user_email: occupation.user_email,
                        repeat: occupation.repeat,
                        is_pay: occupation.is_pay,
                        status: occupation.status,
                    });
                });
            } else if (occupation.repeat === 'daily') {
                Array.from({length: maxToRepeat}, (_, i) => {
                    const date = new Date(occupation.from_datetime);
                    date.setDate(date.getDate() + (i + 1));
                    const dateEnd = new Date(occupation.to_datetime);
                    dateEnd.setDate(dateEnd.getDate() + (i + 1));
                    dataArrayToAppend.push({
                        id: occupation.id,
                        from_datetime: date.toISOString().split("T")[0],
                        to_datetime: dateEnd.toISOString().split("T")[0],
                        user_email: occupation.user_email,
                        repeat: occupation.repeat,
                        is_pay: occupation.is_pay,
                        status: occupation.status,
                    });
                });
            }
        });
        data.push(...dataArrayToAppend);
        this.setState({eventCalendar: data});
    };

    public getStartNotation = async () => {
        const data = await this.reserveModel.getStartNotation();
        this.setState({notation: data});
    };

    public fetchReservations = async () => {
        const dateStart = document.querySelector<HTMLInputElement>("#date-start");
        const dateEnd = document.querySelector<HTMLInputElement>("#date-end");
        if (dateStart !== null && dateEnd !== null) {
            if (!this.reserveViewModel.verifyDate(dateStart.value, dateEnd.value)) {
                this.reserveViewModel.openPopupBadDate();
            } else if (!(await this.reserveModel.isOccupied(dateStart.value, dateEnd.value))) {
                const status = document.querySelector<HTMLSelectElement>("#status-reservation")?.value;
                const presentation = document.querySelector<HTMLInputElement>("#presentation")?.value;
                const salary = document.querySelector<HTMLInputElement>("#salary")?.value;
                const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
                const response = await fetch(
                    apiPath + this.apiSubPath + "/occupation",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: localStorage.getItem("token") || "",
                        },
                        body: JSON.stringify({
                            location_id: this.id,
                            from_datetime: dateStart.value,
                            to_datetime: dateEnd.value,
                            price: this.state.data.price,
                            description: `${status} - ${presentation} - ${salary}€/m`,
                        }),
                    }
                );
                const data = await response.json();
                await this.reservedNewService(data.id);
                document.location.href = "/resa";
            } else {
                this.reserveViewModel.openPopupBadDate();
            }
        } else {
            this.reserveViewModel.openPopupBadDate();
        }
    };

    private getMessages = async () => {
        const messages = await this.reserveModel.getMessages();
        this.setState({messages: messages[0]});
    };


    public fetchMessagesForBail = async () => {
        const messages = await this.reserveModel.fetchMessagesForBail();
        this.setState({messages: messages[0]});
    };


    public downloadFactureService = async (name: string, date: string, price: number) => {
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const page = await pdfDoc.addPage();
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
        page.drawText('Location : ' + name, {
            x: 50,
            y: height - 12 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        page.drawText('Date : ' + date, {
            x: 50,
            y: height - 14 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        page.drawText('Prix : ' + price + '€', {
            x: 50,
            y: height - 16 * fontSize,
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
        let positionYFinal = 9;
        let totalPriceFinal = 0;
        this.state.eventCalendar.map((event) => {
            const date = new Date(event.from_datetime);
            const dateEnd = new Date(event.to_datetime);
            if (date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear() && event.user_email !== this.state.data.created_by) {
                const diff = dateEnd.getTime() - date.getTime();
                const diffDays = diff / (1000 * 60 * 60 * 24);
                const totalPrice = diffDays * this.state.data.price;
                totalPriceFinal += totalPrice;
                page.drawText(`Total : ${totalPrice} €`, {
                    x: 50,
                    y: height - (positionYFinal) * fontSize,
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                });
                positionYFinal += 2;
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

    public downloadFacture = async () => {
        const isSubscribed = await this.reserveModel.fetchIsSubscribed();
        let lastDateFreeService = '';
        if (isSubscribed !== 0) {
            lastDateFreeService = await this.reserveModel.fetchLastDateFreeService();
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
        page.drawLine({
            start: {x: 50, y: height - 22 * fontSize},
            end: {x: width - 50, y: height - 22 * fontSize},
            thickness: 2,
            color: rgb(0, 0, 0),
        });


        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], {type: "application/pdf"});
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "facture.pdf";
        link.click();
    };

    private reservedNewService = async (id_reservation: number) => {
        const cardElement = document.querySelectorAll<HTMLDivElement>(
            ".services-new .card"
        );
        if (cardElement.length === 0) {
            return;
        }
        const listIdCard: number[] = [];
        this.state.servicesGlobal.map((service, index) => {
            if (!this.state.services.find((s) => s.id === service.id)) {
                listIdCard.push(service.id);
            }
        });

        cardElement.forEach((card, index) => {
            if (card.classList.contains('active')) {
                const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
                fetch(apiPath + '/service/service-by-user', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        authorization: localStorage.getItem("token") || "",
                    },
                    body: JSON.stringify({
                        location_occupation_id: id_reservation,
                        service_id: listIdCard[index],
                    }),
                });
            }
        });
    };

    private fetchServiceReserved = async () => {
        const data = await this.reserveModel.fetchServiceReserved();
        this.setState({servicesSelected: data});
    };

    private fetchJob = async () => {
        const data = await this.reserveModel.fetchJob();
        this.setState({services: data});
    };

    private verifIsAdmin = async () => {
        const data = await this.reserveModel.verifIsAdmin();
        if (data.connection) {
            this.setState({isAdmin: true});
            await this.reserveModel.resetNewMessage();
        }
    };

    public addMessage = async () => {
        const messageTemp = this.state.messages;
        messageTemp.push({
            message: document.querySelector<HTMLInputElement>("#message")?.value || "",
        });
        this.setState({messages: messageTemp});
        await this.reserveModel.addMessage();
    };

    public updateServiceSelected = () => {
        const serviceSelected = document.querySelector<HTMLSelectElement>("#service-name");
        if (serviceSelected !== null) {
            this.setState({serviceSelected: serviceSelected.value});
        }
    };

    private getFileNameLocationOccupation = async () => {
        const data = await this.reserveModel.getFileNameLocationOccupation();
        this.setState({fileNameOccupation: data.data});
    };

    private displayPicture = async () => {
        const pictures = await this.reserveModel.getPicture(this.id);
        const allPictures = await this.reserveModel.getAllPicture(this.id);
        setTimeout(async () => {
            const card = document.querySelector<HTMLElement>('#container-picture');
            if (card) {
                if (pictures.status !== 500) {
                    const data = await pictures.json();
                    const imgBase64 = `data:image/png;base64,${data.base64}`;
                    card.style.backgroundImage = `url(${imgBase64})`;
                }
            }
            const cardContainer = document.querySelector<HTMLElement>('#container-picture-all');
            if (cardContainer) {
                allPictures.map(async (picture) => {
                    const card = document.createElement('div');
                    card.classList.add('calendar-form-complete');
                    card.style.backgroundSize = 'cover';
                    card.style.height = '200px';
                    card.style.width = '200px';
                    card.style.backgroundImage = `url(data:image/png;base64,${picture.base64})`;
                    cardContainer.appendChild(card);
                });
            }
        }, 200);
    };

    render() {
        if (this.state.isBail === undefined && this.state.services.length === 0) {
            return <Loading/>;
        }
        return <ReserveView
            isProvider={this.isProvider}
            idResa={this.idResa}
            fileNameOccupation={this.state.fileNameOccupation}
            serviceUser={this.state.serviceUser}
            userRequestService={this.state.userRequestService}
            sendRequestService={this.reserveModel.sendRequestService}
            isAdmin={this.state.isAdmin}
            bailIsOccupied={this.bailIsOccupied}
            isService={this.isService}
            fetchMessagesForBail={this.fetchMessagesForBail}
            postMessageForBail={this.reserveModel.postMessageForBail}
            eventCalendar={this.state.eventCalendar}
            servicesSelected={this.state.servicesSelected}
            addService={this.reserveViewModel.addService}
            servicesGlobal={this.state.servicesGlobal}
            description={this.state.description}
            deleteLocation={this.reserveModel.deleteLocation}
            isBail={this.state.isBail}
            downloadFacture={this.downloadFacture}
            deleteOccupation={this.reserveModel.deleteOccupation}
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
            downloadFileBail={this.reserveModel.downloadFileBail}
            postFileBail={this.reserveModel.postFileBail}
            serviceSelected={this.state.serviceSelected}
            updateServiceSelected={this.updateServiceSelected}
            locationsPaiement={this.reserveModel.locationsPaiement}
            locationOccupationPaiement={this.reserveModel.locationOccupationPaiement}
            deleteOccupationBail={this.reserveModel.deleteOccupationBail}
            downloadFactureService={this.downloadFactureService}
            paidPresentation={this.reserveModel.paidPresentation}
            postFileLocationOccupation={this.reserveModel.postFileLocationOccupation}/>;
    }
}
