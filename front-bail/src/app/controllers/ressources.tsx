import {ControllerProps, ControllerState} from "../@types/ressources";
import ResourcesView from "../views/ressources";
import React from "react";
import {Location} from "../@types/location";
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
        const dataLocation: Location[] = await this.resourcesModel.fetchLocation();
        this.setState({locationNotFiltered: dataLocation});
        this.setState({location: dataLocation});
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