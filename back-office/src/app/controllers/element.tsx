import React from "react";
import {ElementView} from "../views/element";
import {ControllerProps, ControllerState} from "../@types/element";
import {ElementModel} from "../model/element";

export default class ElementController extends React.Component<ControllerProps, ControllerState> {

    elementModel: ElementModel;

    constructor(props: ControllerProps) {
        super(props);
        this.state = {};
        this.elementModel = new ElementModel();
        this.elementModel.getLastPrice();
    }


    render() {
        return (
            <ElementView
                updatePrice={this.elementModel.updatePrice}
                postElement={this.elementModel.postElement}
                postJob={this.elementModel.postJob}
            />
        );
    }
}