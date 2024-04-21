import React, {Component} from "react";
import {observer} from "mobx-react";

import {ControllerProps, ControllerState} from '../@types/ticket';
import View from '../views/ticket';
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";
import {TicketModel} from "../model/ticket";

@observer
export default class TicketControllers extends Component<
    ControllerProps,
    ControllerState
> {

    ticketModel: TicketModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.ticketModel = new TicketModel();
        this.getData();
    }

    state: ControllerState = {
        data: [],
    };

    getData = async () => {
        const data = await this.ticketModel.getData();
        this.setState({data: data});
    };

    render() {
        if (this.state.data.length === 0) {
            return <Loading/>;
        }
        return <View data={this.state.data}/>;
    }
}
