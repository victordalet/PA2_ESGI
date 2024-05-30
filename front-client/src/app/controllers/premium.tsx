import React from "react";
import {PremiumView} from "../views/premium";
import {ControllerProps, ControllerState} from "../@types/premium";
import PremiumViewModel from "../view-models/premium";
import {haveToken} from "../../security/token";
import {PremiumModel} from "../model/premium";
import {Loading} from "../../components/loading";

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
        this.getPrice();
    }

    state: ControllerState = {
        price: []
    };

    public subscribe = async (price: number) => {
        await this.premiumModel.subscribe(price);
        this.premiumViewModel.openPopup();
    };

    public deleteSubscription = async () => {
        await this.premiumModel.deleteSubscription();
        this.premiumViewModel.openPopup();
    };

    private async getPrice() {
        const price = await this.premiumModel.getPrice();
        this.setState({price});
    }

    render() {

        if (this.state.price.length === 0) return (<Loading/>);
        return <PremiumView
            price={this.state.price}
            subscribe={this.subscribe}
            deleteSubscription={this.deleteSubscription}
        />;
    }
}