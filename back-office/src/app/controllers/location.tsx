import React, {Component} from "react";
import {observer} from "mobx-react";

import {
    ControllerProps,
    ControllerState,
    DataResponse,
} from "../@types/location";
import View from "../views/location";
import {Navbar} from "../../components/navbar";
import {haveToken} from "../../security/token";

@observer
export default class LocationController extends Component<
    ControllerProps,
    ControllerState
> {
    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.getData();
    }

    state: ControllerState = {
        data: [],
    };

    getData = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        fetch(apiPath + "/location", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        }).then((r) => {
            console.log(r);
            r.json().then((data: DataResponse[]) => {
                this.setState({
                    data: data,
                });
            });
        });
    };

    render() {
        if (this.state.data.length === 0) {
            return (
                <div>
                    <Navbar/>
                </div>
            );
        }
        return <View data={this.state.data}/>;
    }
}
