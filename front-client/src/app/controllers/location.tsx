import React from "react";
import LocationView from "../views/location";
import {ControllerProps, ControllerState} from "../@types/location";
import LocationViewModel from "../view-models/location";
import {Loading} from "../../components/loading";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {


    private locationViewModel: LocationViewModel;

    constructor(props: ControllerProps) {
        super(props);
        this.fetchLocation();
        this.locationViewModel = new LocationViewModel();
    }

    state = {
        location: [],
        locationNoFilter: []
    };


    private fetchLocation = () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        fetch(apiPath + '/location', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        }).then((res) => {
            res.json().then((data) => {
                this.setState({location: data, locationNoFilter: data});
            });
        });
    };

    public filterByPrice = () => {
        const select = document.querySelector<HTMLSelectElement>('select');
        if (select) {
            if (select.value === '0') {
                this.setState({
                    location: this.locationViewModel.filterByASC(this.state.locationNoFilter)
                });
            } else {
                this.setState({
                    location: this.locationViewModel.filterByDSC(this.state.locationNoFilter)
                });
            }
        }
    };

    public filterLocationByNameOrDescription = () => {
        const input = document.querySelector<HTMLInputElement>('#search');
        const text = input ? input.value : '';
        this.setState({
            location: this.locationViewModel.filterLocationByNameOrDescription(this.state.locationNoFilter, text)
        });
    };

    public filterLocationByCity = () => {
        const input = document.querySelector<HTMLInputElement>('#city');
        const text = input ? input.value : '';
        this.setState({
            location: this.locationViewModel.filterLocationByCity(this.state.locationNoFilter, text)
        });
    };

    public filterLocationByCapacity = () => {
        const input = document.querySelector<HTMLInputElement>('#capacity');
        const text = input ? input.value : '';
        this.setState({
            location: this.locationViewModel.filterLocationByCapacity(this.state.locationNoFilter, parseInt(text))
        });
    };

    render() {

        if (this.state.locationNoFilter.length === 0) {
            return <Loading/>;
        }

        return <LocationView
            location={this.state.location}
            filterByPrice={this.filterByPrice}
            filterLocationByNameOrDescription={this.filterLocationByNameOrDescription}
            filterLocationByCity={this.filterLocationByCity}
            filterLocationByCapacity={this.filterLocationByCapacity}/>;
    }
}