import React from "react";
import ServiceView from "../views/service";
import {ControllerProps, ControllerState, ServiceResponse} from "../@types/service";
import ServiceViewModel from "../view-models/service";
import {Loading} from "../../components/loading";
import {ServiceModel} from "../model/service";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    private serviceViewModel: ServiceViewModel;
    private serviceModel: ServiceModel;

    constructor(props: ControllerProps) {
        super(props);
        this.serviceModel = new ServiceModel();
        this.serviceViewModel = new ServiceViewModel();
        this.fetchService();
    }

    state = {
        service: [],
        serviceNoFilter: [],
    };


    private fetchService = async () => {
        const data: ServiceResponse[] = await this.serviceModel.fetchService();
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
