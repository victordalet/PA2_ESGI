import React from "react";
import {ResaView} from "../views/resa";
import {ControllerProps, ControllerState} from "../@types/resa";
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";
import {ResaModel} from "../model/resa";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    private resaModel: ResaModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.resaModel = new ResaModel();
        this.getLocation();
        this.getLocationsOccupationNotifInfo();
    }

    state: ControllerState = {
        data: [],
        locationOccupationServiceRequest: [],
    };

    public getLocationsOccupationNotifInfo = async () => {
        let data = await this.resaModel.getLocationsOccupationNotifInfo();
        data = data.filter((user) => user.status === 'good' && user.user_email === localStorage.getItem('email'));
        this.setState({locationOccupationServiceRequest: data});
    };

    private getLocation = async () => {
        const data = await this.resaModel.getLocation();
        this.setState({data: data.filter((location: any) => location.created_by !== localStorage.getItem("email"))});
        if (data.length === 0) {
            document.location.href = "/location";
        }
    };

    render() {
        if (this.state.data.length === 0) {
            return <Loading/>;
        }

        return <ResaView
            locationOccupationServiceRequest={this.state.locationOccupationServiceRequest}
            data={this.state.data}/>;
    }
}
