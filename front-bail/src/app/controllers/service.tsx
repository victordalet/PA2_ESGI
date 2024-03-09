import React from "react";
import ServiceView from "../views/service";
import {ControllerProps, ControllerState, Service, ServiceForm} from "../@types/service";
import ServiceViewModel from "../view-models/service";
import {haveToken} from "../../security/token";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {


    private readonly ServiceViewModel: ServiceViewModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.ServiceViewModel = new ServiceViewModel();
    }

    public createService = async () => {
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const title = (document.getElementById("title") as HTMLInputElement).value;
        const description = (document.getElementById("description") as HTMLInputElement).value;
        const price = (document.getElementById("price") as HTMLInputElement).value;
        const cat = (document.getElementById("cat") as HTMLInputElement).value;
        const duration = (document.getElementById("duration") as HTMLInputElement).value;
        const file = (document.getElementById("image") as HTMLInputElement).files;
        const data: ServiceForm = {
            email: email,
            title: title,
            description: description,
            location: '',
            price: parseInt(price),
            cat: cat,
            duration: duration
        };
        if (email === '' || title === '' || description === '' || price === '' || cat === '' || duration === '' || !file) {
            this.ServiceViewModel.openPopupError();
            return;
        }

        const dataToSend: Service = {
            name: title,
            price: parseInt(price),
            description: JSON.stringify(data),
            duration: parseInt(duration),
            created_by: email,
            id: 0
        };
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(apiPath + '/service', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify(dataToSend)
        });
        const id = await res.json();
        await this.uploadImage(id.id);
    };

    private uploadImage = async (id: number) => {
        const file = (document.getElementById("image") as HTMLInputElement).files;
        if (file) {
            const formData = new FormData();
            formData.append('file', file[0]);
            formData.append('picture', `service-${id.toString()}`);
            const apiPath = process.env.API_HOST || 'http://localhost:3001';
            await fetch(`${apiPath}/picture`, {
                method: "POST",
                headers: {
                    'authorization': localStorage.getItem('token') || ''
                },
                body: formData
            });
            document.location.href = "/home";
        }
    };


    render() {
        return <ServiceView
            createService={this.createService}/>;
    }

}
