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
    }

    state: ControllerState = {
        data: [],
    };

    private getLocation = () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        fetch(apiPath + "/location/get-location-occupation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        }).then((res) => {
            res.json().then((data) => {
                this.setState({data: data});
                console.log(data);
                if (data.length === 0) {
                    document.location.href = "/location";
                }
            });
        });
    };

    render() {
        if (this.state.data.length === 0) {
            return <Loading/>;
        }

        return <ResaView data={this.state.data}/>;
    }
}
