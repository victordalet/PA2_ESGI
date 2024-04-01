import React, {Component} from "react";
import {observer} from "mobx-react";

import {ControllerProps, ControllerState} from '../@types/ticket';
import View from '../views/ticket';
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";

@observer
export default class TicketControllers extends Component<
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
        const res = await fetch(apiPath + "/ticket", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        const data = await res.json();
        this.setState({data: data});
    };

    render() {
        if (this.state.data.length === 0) {
            return <Loading/>;
        }
        return <View data={this.state.data}/>;
    }
}
