import {ControllerProps, ControllerState} from "../@types/pres";
import {PresView} from "../views/pres";
import React from "react";

export default class PresController extends React.Component<ControllerProps, ControllerState> {
    constructor(props: ControllerProps) {
        super(props);
        this.state = {
        };
    }
    render() {
        return <PresView />;
    }
}