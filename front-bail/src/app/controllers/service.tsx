import React from "react";
import ServiceView from "../views/service";
import {ControllerProps, ControllerState, Service, ServiceForm} from "../@types/service";
import ServiceViewModel from "../view-models/service";
import {havePrestataireToken, haveToken} from "../../security/token";
import {Loading} from "../../components/loading";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {


    private readonly ServiceViewModel: ServiceViewModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.getJobs();
        havePrestataireToken().then(r => {
            if (!r) {
                document.location.href = "/home";
            }
        });
        this.ServiceViewModel = new ServiceViewModel();
    }

    state: ControllerState = {
        jobs: []
    };

    public getPictureBackground = async () => {
        const job = (document.getElementById("job") as HTMLSelectElement).value;
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(`${apiPath}/picture/${job}-1`, {
            headers: {
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data = await res.json();
        const imgBase64 = `data:image/png;base64,${data.base64}`;
        const background = document.querySelector('.container-service') as HTMLElement;
        background.style.backgroundImage = `url(${imgBase64})`;
    };


    private formatSchedule = () => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const schedule: any = {};
        days.forEach(day => {
            const start = (document.getElementById(`start-${day}`) as HTMLInputElement).value;
            const end = (document.getElementById(`end-${day}`) as HTMLInputElement).value;
            schedule[day] = {
                start: start,
                end: end
            };
        });
        return schedule;
    };

    public createService = async () => {
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const title = (document.getElementById("title") as HTMLInputElement).value;
        const description = (document.getElementById("description") as HTMLInputElement).value;
        const price = (document.getElementById("price") as HTMLInputElement).value;
        const job = (document.getElementById("job") as HTMLSelectElement).value;
        const siret = (document.getElementById("siret") as HTMLInputElement).value;
        const duration = (document.getElementById("duration") as HTMLInputElement).value;
        const city = (document.getElementById("city") as HTMLInputElement).value;
        const data: ServiceForm = {
            email: email,
            title: title,
            description: description,
            location: '',
            price: parseInt(price),
            cat: job,
            duration: duration,
            siret: siret,
            city: city
        };
        if (email === '' || title === '' || description === '' || price === ''
            || job === '' || duration === '' || siret === '') {
            this.ServiceViewModel.openPopupError();
            return;
        }

        const dataToSend: Service = {
            name: title,
            price: parseInt(price),
            description: JSON.stringify(data),
            duration: parseInt(duration),
            created_by: email,
            id: 0,
            is_valid: 0,
            type: (document.querySelector('#type-service') as HTMLSelectElement).value,
            schedule: JSON.stringify(this.formatSchedule()),
            city: city,
            siret: siret
        };
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(apiPath + '/service', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify(dataToSend)
        });
        document.location.href = '/resources';
    };


    private async getJobs() {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(apiPath + '/job', {
            headers: {
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const jobs = await res.json();
        this.setState({jobs: jobs});
    }


    render() {

        if (this.state.jobs.length === 0) {
            return <Loading/>;
        }

        return <ServiceView
            createService={this.createService}
            getPictureBackground={this.getPictureBackground}
            jobs={this.state.jobs}/>;
    }

}
