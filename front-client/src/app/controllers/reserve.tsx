import {ControllerProps, ControllerState} from "../@types/reserve";
import React from "react";
import {ReserveView} from "../views/reserve";
import {LocationResponse} from "../@types/location";
import {Navbar} from "../../components/navbar";
import {ServiceResponse} from "../@types/service";
import ReserveViewModel from "../view-models/reserve";
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';

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
        this.idResa = 0;
        this.id = parseInt(document.location.href.split('?')[1].split('&')[0]);
        this.type = document.location.href.split('&a=')[1].includes('true');
        this.isService = document.location.href.includes('service');
        this.apiSubPath = this.isService ? '/service' : '/location';
        if (this.type) {
            this.idResa = parseInt(document.location.href.split('&id2=')[1]);
            this.isAlsoReserved();
        }
        this.getStartNotation();
        this.fetchLocation();
        this.reserveViewModel = new ReserveViewModel();
    }


    state: ControllerState = {
        data: {} as LocationResponse,
        services: [],
        isReserved: false,
        notation: 0,
        messages: []
    };


    private fetchLocation = () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + this.apiSubPath, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        }).then((res) => {
            res.json().then((data) => {
                this.setState({data: data.filter((location: ServiceResponse) => location.id === this.id)[0]});
            });
        });
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
                await fetch(apiPath + this.apiSubPath + '/occupation', {
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
                document.location.href = '/resa';
            } else {
                this.reserveViewModel.openPopupBadDate();
            }

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
                location_id: this.id
            })
        });
        document.location.href = '/location';
    };


    public downloadFacture = async () => {
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const page = pdfDoc.addPage();
        const {width, height} = page.getSize();
        const fontSize = 30;
        page.drawText('Facture', {
            x: 50,
            y: height - 4 * fontSize,
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

        if (this.state.data.name === undefined) {
            return <Navbar/>;
        }

        return <ReserveView
            downloadFacture={this.downloadFacture}
            deleteOccupation={this.deleteOccupation}
            messages={this.state.messages}
            addMessage={this.addMessage}
            notation={this.state.notation}
            addNotation={this.addNotation}
            data={this.state.data}
            services={this.state.services}
            fetchReservations={this.fetchReservations}
            isReserved={this.state.isReserved}/>;
    }

}