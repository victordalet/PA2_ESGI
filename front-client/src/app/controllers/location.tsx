import React from "react";
import LocationView from "../views/location";
import {ControllerProps, ControllerState} from "../@types/location";
import LocationViewModel from "../view-models/location";
import {Loading} from "../../components/loading";
import {LocationModel} from "../model/location";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    private locationViewModel: LocationViewModel;
    private locationModel: LocationModel;

    constructor(props: ControllerProps) {
        super(props);
        this.locationModel = new LocationModel();
        this.locationViewModel = new LocationViewModel();
        this.fetchLocation();
    }

    state = {
        location: [],
        locationNoFilter: [],
    };

    private fetchLocation = async () => {
        const data = await this.locationModel.fetchLocation();
        this.setState({location: data});
        this.setState({locationNoFilter: data});
    };

    public filterByPrice = () => {
        const select = document.querySelector<HTMLSelectElement>("select");
        if (select) {
            if (select.value === "0") {
                this.setState({
                    location: this.locationViewModel.filterByASC(
                        this.state.locationNoFilter
                    ),
                });
            } else {
                this.setState({
                    location: this.locationViewModel.filterByDSC(
                        this.state.locationNoFilter
                    ),
                });
            }
        }
    };

    public filterLocationByNameOrDescription = () => {
        const input = document.querySelector<HTMLInputElement>("#search");
        const text = input ? input.value : "";
        this.setState({
            location: this.locationViewModel.filterLocationByNameOrDescription(
                this.state.locationNoFilter,
                text
            ),
        });
    };

    public filterLocationByCity = () => {
        const input = document.querySelector<HTMLInputElement>("#city");
        const text = input ? input.value : "";
        this.setState({
            location: this.locationViewModel.filterLocationByCity(
                this.state.locationNoFilter,
                text
            ),
        });
    };

    public filterLocationByCapacity = () => {
        const input = document.querySelector<HTMLInputElement>("#capacity");
        const text = input ? input.value : "";
        this.setState({
            location: this.locationViewModel.filterLocationByCapacity(
                this.state.locationNoFilter,
                parseInt(text)
            ),
        });
    };

    render() {
        if (this.state.locationNoFilter.length === 0) {
            return <Loading/>;
        }

        return (
            <LocationView
                location={this.state.location}
                filterByPrice={this.filterByPrice}
                filterLocationByNameOrDescription={
                    this.filterLocationByNameOrDescription
                }
                filterLocationByCity={this.filterLocationByCity}
                filterLocationByCapacity={this.filterLocationByCapacity}
            />
        );
    }
}
