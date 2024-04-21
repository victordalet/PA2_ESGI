import {ControllerProps, ControllerState} from "../@types/accept";
import React from "react";
import AcceptView from "../views/accept";
import {observer} from "mobx-react";
import {Loading} from "../../components/loading";
import {AcceptModel} from "../model/accept";

@observer
export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    acceptModel: AcceptModel;

    constructor(props: ControllerProps) {
        super(props);
        this.acceptModel = new AcceptModel();
        this.fetchEmails();
    }

    state: ControllerState = {
        emails: [],
    };

    private fetchEmails = async () => {
        const emails = await this.acceptModel.fetchEmails();
        this.setState({
            emails: emails,
        });
    };


    render() {
        if (this.state.emails.length === 0) {
            return <Loading/>;
        }

        return (
            <AcceptView emails={this.state.emails} acceptEmail={this.acceptModel.acceptEmail}/>
        );
    }
}
