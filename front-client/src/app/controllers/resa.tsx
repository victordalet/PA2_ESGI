import React from "react";
import {ResaView} from "../views/resa";
import {ControllerProps, ControllerState} from "../@types/resa";
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.getLocation();
        this.getLocationsOccupationNotifInfo();
    }

    state: ControllerState = {
        data: [],
        locationOccupationServiceRequest: [],
    };

    public getLocationsOccupationNotifInfo = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/location/occupation-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        let data: any[] = await response.json();
        data = data.filter((user) => user.status === 'good' && user.user_email === localStorage.getItem('email'));
        this.setState({locationOccupationServiceRequest: data});
    };

    private getLocation = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + "/location/get-location-occupation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        const data = await response.json();
        console.log(data);
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
