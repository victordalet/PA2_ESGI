import {ControllerState, ControllerProps, LocationAvailability} from "../@types/occupation";
import {Component} from "react";
import {observer} from "mobx-react";
import {OccupationView} from "../views/occupation";
import {haveToken} from "../../security/token";

@observer
export default class OccupationController extends Component<
    ControllerProps,
    ControllerState
> {

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.getLocationsOccupationAdminInfo();
    }

    state: ControllerState = {
        data: [],
        dataNotFiltered: []
    };

    public filterOccupation = () => {
        const element = document.querySelector('#search-occ') as HTMLInputElement;
        this.setState({data: this.state.dataNotFiltered.filter((item: LocationAvailability) => item.user_email.includes(element.value))});
    };

    public filterOccupationMessage = () => {
        const element = document.querySelector('#search-nb-message') as HTMLInputElement;
        this.setState({data: this.state.dataNotFiltered.filter((item: LocationAvailability) => item.nb_message === parseInt(element.value))});
    };

    public getLocationsOccupationAdminInfo = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/location/occupation-info-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        let data = await response.json();
        data = data.filter((item: LocationAvailability) => item.created_by !== item.user_email);
        data = data.filter((item: LocationAvailability) => {
            if (item.to_datetime) {
                const to_datetime = new Date(item.to_datetime);
                const now = new Date();
                return to_datetime > now;
            }
            return true;
        });
        this.setState({dataNotFiltered: data});
        this.setState({data: data});
    };

    render() {
        return <OccupationView
            filterOccupation={this.filterOccupation}
            filterOccupationMessage={this.filterOccupationMessage}
            data={this.state.data}/>;
    }
}