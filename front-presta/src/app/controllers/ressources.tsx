import {ControllerProps, ControllerState} from "../@types/ressources";
import ResourcesView from "../views/ressources";
import React from "react";
import {Service} from "../@types/service";
import {haveToken} from "../../security/token";
import {ResourcesModel} from "../model/ressources";

export default class Controller extends React.Component<ControllerProps, ControllerState> {

    resourcesModel: ResourcesModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.resourcesModel = new ResourcesModel();
        this.fetchResources();
    }

    state: ControllerState = {
        location: [],
        services: [],
        locationNotFiltered: [],
        serviceNotFiltered: [],
    };


    private fetchResources = async () => {
        const data: Service[] = await this.resourcesModel.fetchServices();
        this.setState({serviceNotFiltered: data});
        this.setState({services: data});
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
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