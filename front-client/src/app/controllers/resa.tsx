import React from "react";
import {ResaView} from "../views/resa";
import {ControllerProps, ControllerState} from "../@types/resa";
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
        return <ResaView/>;
    }
}