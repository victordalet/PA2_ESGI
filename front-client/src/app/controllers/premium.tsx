import React from "react";
import {PremiumView} from "../views/premium";
import {ControllerProps, ControllerState} from "../@types/premium";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    render() {
        return <PremiumView/>;
    }
}