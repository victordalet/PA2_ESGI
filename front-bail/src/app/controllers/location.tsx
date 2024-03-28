import React from "react";
import {ControllerProps, ControllerState, LocationService, YoloResponse} from "../@types/location";
import LocationViewModel from "../view-models/location";
import {haveBailToken, haveToken} from "../../security/token";
import LocationView from "../views/location";
import {Service} from "../@types/service";


export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    state: ControllerState = {
        service: [],
        serviceSelected: [],
        price: 0
    };


    private readonly locationViewModel: LocationViewModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        haveBailToken().then(r => {
            if (!r) {
                document.location.href = "/home";
            }
        });
        this.locationViewModel = new LocationViewModel();
        this.fetchService();
    }


    public addServiceSelected = (service: LocationService, index: number) => {
        this.setState({serviceSelected: [...this.state.serviceSelected, service]});
        this.locationViewModel.addServiceToForm(service, index);
    };

    private validationCaptcha = (value: any) => {
        console.log(value);
    };


    private fetchService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/service`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        let data: Service[] = await response.json();
        data = data.filter((service) => {
            return service.type === 'BAIL';
        });
        this.setState({service: data});
    };


    public createLocation = async () => {
        const data = this.locationViewModel.storeFormInJSON();
        data.service = this.state.serviceSelected;
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(`${apiPath}/location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                created_by: data.email,
                name: data.nameFounder,
                description: JSON.stringify(data),
                address: data.address,
                latitude: 0,
                longitude: 0,
                capacity: data.numberRoom,
                price: 100,
                type: data.typeLocation,
            })
        });
        const id = await res.json();
        await this.uploadImage(id.id);
    };

    private uploadImage = async (id: number) => {
        const file = (document.getElementById("image") as HTMLInputElement).files;
        if (file) {
            const formData = new FormData();
            formData.append('file', file[0]);
            formData.append('picture', `location-${id.toString()}`);
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

    public getPredictYolo = async () => {
        const apiPath = process.env.YOLO_ESTIMATOR_PORT || 'http://localhost:5000';
        const imageElement = (document.getElementById("image-file-to-yolo") as HTMLInputElement).files;
        const formData = new FormData();
        if (imageElement) {
            console.log(imageElement[0]);
            formData.append('image', imageElement[0]);
            const response = await fetch(`${apiPath}/predict`, {
                method: 'POST',
                body: formData
            });
            const data: YoloResponse = await response.json();
            document.getElementById('price-estimate-by-yolo')!.innerText = `Estimate Price: ${data.price.toString()} €`;
            const body = document.querySelector<HTMLElement>('.container-yolo-image-result');
            if (body) {
                body.style.backgroundImage = `url(data:image/png;base64,${data.image})`;
            }
        }
    };


    render() {
        return (
            <LocationView
                getPredictYolo={this.getPredictYolo}
                validationCaptcha={this.validationCaptcha}
                addServiceToForm={this.addServiceSelected}
                service={this.state.service}
                activeStep2={this.locationViewModel.activeStep2}
                allSelectedRadioContact={this.locationViewModel.allSelectedRadioContact}
                resetChoiceConcierge={this.locationViewModel.resetChoiceConcierge}
                storeFormInJSON={this.createLocation}/>
        );
    }
}