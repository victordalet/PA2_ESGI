import React from "react";
import ServiceView from "../views/service";
import {ControllerProps, ControllerState, ServiceResponse} from "../@types/service";
import ServiceViewModel from "../view-models/service";
import {Loading} from "../../components/loading";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    private serviceViewModel: ServiceViewModel;

    constructor(props: ControllerProps) {
        super(props);
        this.fetchService();
        this.serviceViewModel = new ServiceViewModel();
    }

    state = {
        service: [],
        serviceNoFilter: [],
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
        data.filter((service) => {
            return service.type === 'USER';
        });
        this.setState({service: data, serviceNoFilter: data});
    };

    filterByPrice = () => {
        const select = document.querySelector<HTMLSelectElement>("select");
        if (select) {
            if (select.value === "0") {
                this.setState({
                    service: this.serviceViewModel.filterByASC(
                        this.state.serviceNoFilter
                    ),
                });
            } else {
                this.setState({
                    service: this.serviceViewModel.filterByDSC(
                        this.state.serviceNoFilter
                    ),
                });
            }
        }
    };

    filterServiceByNameOrDescription = () => {
        const input = document.querySelector<HTMLInputElement>("input");
        const text = input ? input.value : "";
        this.setState({
            service: this.serviceViewModel.filterServiceByNameOrDescription(
                this.state.serviceNoFilter,
                text
            ),
        });
    };

    render() {
        if (this.state.serviceNoFilter.length === 0) {
            return <Loading/>;
        }

        return (
            <ServiceView
                service={this.state.service}
                filterByPrice={this.filterByPrice}
                filterServiceByNameOrDescription={this.filterServiceByNameOrDescription}
            />
        );
    }
}
