import React from "react";
import LocationView from "../views/location";
import {ControllerProps, ControllerState} from "../@types/location";
import LocationViewModel from "../view-models/location";
import {Loading} from "../../components/loading";
import {LocationModel} from "../model/location";
import {locationType} from "../@types/Home";

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
        this.getTypeLocation();
    }

    state = {
        location: [],
        locationNoFilter: [],
        locationTypes: [],
        selected: [],
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

    public getTypeLocation = async () => {
        const data = await this.locationModel.getTypeLocation();
        this.setState({locationTypes: data});
        if (window.location.href.includes("?type=")) {
            const type = window.location.href.split("?type=")[1];
            const label = type;
            this.handleChangeSelected([{label, value: type}]);
        }
    };

    public handleChangeSelected = (selected: any) => {
        this.setState({selected});
        this.setState({
            location: this.locationViewModel.filterLocationByType(
                this.state.locationNoFilter,
                selected
            ),
        });
    };


    render() {
        if (this.state.locationNoFilter.length === 0) {
            return <Loading/>;
        }

        return (
            <LocationView
                selected={this.state.selected}
                handleChangeSelected={this.handleChangeSelected}
                locationTypes={this.state.locationTypes}
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
