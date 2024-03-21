import React from "react";
import {ControllerProps, ControllerState} from "../@types/reserveService";
import ReserveServiceView from "../views/reserveService";
import {ServiceResponse} from "../@types/service";
import {Navbar} from "../../components/navbar";
import ReserveServiceViewModel from "../view-models/reserveService";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {


    private readonly id: number;
    public reserveServiceViewModel: ReserveServiceViewModel;

    constructor(props: ControllerProps) {
        super(props);
        this.id = parseInt(document.location.href.split('?')[1].split('&')[0]);
        this.reserveServiceViewModel = new ReserveServiceViewModel();
        this.fetchService();
    }

    state: ControllerState = {
        service: {} as ServiceResponse,
        isCreator: undefined
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
        const service = data.find((s) => s.id === this.id);
        if (service) {
            this.setState({service: service});
        }
        await this.isCreator();
    };

    private isCreator = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/user/token-to-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: { email: string } = await response.json();
        if (data.email === this.state.service.created_by) {
            this.setState({isCreator: true});
        } else {
            this.setState({isCreator: false});
        }
    };

    public postNotation = async (notation: number) => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
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
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(apiPath + '/service/' + this.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        window.location.href = '/service';
    };

    render() {

        if (this.state.isCreator === undefined) {
            return <Navbar/>;
        }

        return <ReserveServiceView
            service={this.state.service}
            postNotation={this.postNotation}
            isCreator={this.state.isCreator}
            deleteService={this.deleteService}/>;
    }

}