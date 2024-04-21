import {ControllerState, ControllerProps, LocationAvailability} from "../@types/occupation";
import {Component} from "react";
import {observer} from "mobx-react";
import {OccupationView} from "../views/occupation";
import {haveToken} from "../../security/token";
import {OccupationModel} from "../model/occupation";

@observer
export default class OccupationController extends Component<
    ControllerProps,
    ControllerState
> {

    occupationModel: OccupationModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.occupationModel = new OccupationModel();
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
        const data = await this.occupationModel.getLocationsOccupationAdminInfo();
        this.setState({
            data: data,
            dataNotFiltered: data
        });
    };

    render() {
        return <OccupationView
            filterOccupation={this.filterOccupation}
            filterOccupationMessage={this.filterOccupationMessage}
            data={this.state.data}/>;
    }
}