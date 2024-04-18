import {ControllerProps, ControllerState} from "../@types/ressources";
import ResourcesView from "../views/ressources";
import React from "react";
import {Location} from "../@types/location";
import {Service} from "../@types/service";
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";

export default class Controller extends React.Component<ControllerProps, ControllerState> {

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.fetchResources();
    }

    state: ControllerState = {
        location: [],
        services: [],
        locationNotFiltered: [],
        serviceNotFiltered: [],
    };


    private fetchResources = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/service/service-by-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: Service[] = await response.json();
        this.setState({serviceNotFiltered: data});
        this.setState({services: data});
        const responseLocation = await fetch(`${apiPath}/location/location-by-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const dataLocation: Location[] = await responseLocation.json();
        this.setState({locationNotFiltered: dataLocation});
        this.setState({location: dataLocation});
        console.log(dataLocation);
    };

    public filterResourcesByNameOrDescription = () => {
        const textElement = document.querySelector<HTMLInputElement>('#search');
        if (textElement) {
            const text = textElement.value;
            this.setState({services: this.state.serviceNotFiltered.filter((service) => service.name.includes(text))});
            this.setState({location: this.state.locationNotFiltered.filter((location) => location.name.includes(text))});
        }
    };

    public filterResourcesByPrice = () => {
        const priceElement = document.querySelector<HTMLInputElement>('#price');
        if (priceElement) {
            const price = parseInt(priceElement.value);
            this.setState({services: this.state.serviceNotFiltered.filter((service) => service.price <= price)});
            this.setState({location: this.state.locationNotFiltered.filter((location) => location.price <= price)});
        }
    };

    public filterResourcesByType = () => {
        const typeElement = document.querySelector<HTMLSelectElement>('#type');
        if (typeElement) {
            const type = typeElement.value;
            if (type === 'location') {
                this.setState({location: this.state.locationNotFiltered});
                this.setState({services: []});
            } else {
                this.setState({services: this.state.serviceNotFiltered});
                this.setState({location: []});
            }
        }
    };

    render() {

        return (
            <ResourcesView
                filterResourcesByNameOrDescription={this.filterResourcesByNameOrDescription}
                filterResourcesByPrice={this.filterResourcesByPrice}
                filterResourcesByType={this.filterResourcesByType}
                location={this.state.location}
                service={this.state.services}
            />
        );
    }
}