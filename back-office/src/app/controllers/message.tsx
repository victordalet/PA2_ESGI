import React, {Component} from "react";
import {observer} from "mobx-react";

import {
    ControllerProps,
    ControllerState,
    ResponseIllegibleMessage,
} from "../@types/message";
import View from "../views/message";
import {Navbar} from "../../components/navbar";
import {haveToken} from "../../security/token";
import {Loading} from "../../components/loading";
import {MessageModel} from "../model/message";

@observer
export default class MessageControllers extends Component<
    ControllerProps,
    ControllerState
> {

    messageModel: MessageModel;

    constructor(props: ControllerProps) {
        super(props);
        this.messageModel = new MessageModel();
        haveToken();
        this.getIllegibleMessage();
    }

    state: ControllerState = {
        addInput: "",
        data: [],
    };

    onInputChange =
        (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState<any>({
                [name]: e.target.value,
            });
        };

    addIllegibleMessage = () => {
        this.messageModel.addIllegibleMessage(this.state.addInput);
    };

    getIllegibleMessage = async () => {
        const data = await this.messageModel.getIllegibleMessage();
        this.setState({
            data: data,
        });
    };

    render() {
        if (this.state.data.length === 0) {
            return <Loading/>;
        }
        return (
            <View
                onInputChange={this.onInputChange}
                addIllegibleMessage={this.addIllegibleMessage}
                data={this.state.data}
            />
        );
    }
}
