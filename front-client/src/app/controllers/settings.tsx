import React from "react";
import {SettingsView} from "../views/settings";
import {ControllerProps, ControllerState} from "../@types/settings";
import {haveToken} from "../../security/token";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
    }


    render() {
        return <SettingsView/>;
    }
}