import React from "react";
import ServiceView from "../views/service";
import {ControllerProps, ControllerState, Service, ServiceForm} from "../@types/service";
import ServiceViewModel from "../view-models/service";
import {havePrestataireToken, haveToken} from "../../security/token";
import {Loading} from "../../components/loading";
import {ServiceModel} from "../model/service";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {


    private readonly ServiceViewModel: ServiceViewModel;
    private serviceModel: ServiceModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.serviceModel = new ServiceModel();
        this.ServiceViewModel = new ServiceViewModel();
        this.getJobs();
        havePrestataireToken().then(r => {
            if (!r) {
                document.location.href = "/home";
            }
        });
    }

    state: ControllerState = {
        jobs: []
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
        const vipForm = document.querySelector<HTMLSelectElement>("#type-service")?.value;
        const dataToSend: Service = {
            name: title,
            price: parseInt(price),
            description: JSON.stringify(data),
            duration: parseInt(duration),
            created_by: email,
            id: 0,
            is_valid: 0,
            type: (document.querySelector('#type-service') as HTMLSelectElement).value,
            schedule: JSON.stringify(this.serviceModel.formatSchedule()),
            city: city,
            siret: siret,
            is_vip: vipForm === "VIP" ? 1 : 0
        };
        await this.serviceModel.createService(dataToSend);
    };


    private async getJobs() {
        const jobs = await this.serviceModel.getJobs();
        this.setState({jobs: jobs});
    }


    render() {

        if (this.state.jobs.length === 0) {
            return <Loading/>;
        }

        return <ServiceView
            createService={this.createService}
            getPictureBackground={this.serviceModel.getPictureBackground}
            jobs={this.state.jobs}/>;
    }

}
