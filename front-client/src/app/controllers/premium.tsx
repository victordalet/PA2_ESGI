import React from "react";
import {PremiumView} from "../views/premium";
import {ControllerProps, ControllerState} from "../@types/premium";
import PremiumViewModel from "../view-models/premium";
import {haveToken} from "../../security/token";
import {PremiumModel} from "../model/premium";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    private premiumViewModel: PremiumViewModel;
    private premiumModel: PremiumModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.premiumModel = new PremiumModel();
        this.premiumViewModel = new PremiumViewModel();
    }

    public subscribe = async (price: number) => {
        await this.premiumModel.subscribe(price);
        this.premiumViewModel.openPopup();
    };

    public deleteSubscription = async () => {
        await this.premiumModel.deleteSubscription();
        this.premiumViewModel.openPopup();
    };

    render() {
        return <PremiumView
            subscribe={this.subscribe}
            deleteSubscription={this.deleteSubscription}
        />;
    }
}