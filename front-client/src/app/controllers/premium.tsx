import React from "react";
import {PremiumView} from "../views/premium";
import {ControllerProps, ControllerState} from "../@types/premium";
import PremiumViewModel from "../view-models/premium";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    private premiumViewModel: PremiumViewModel;

    constructor(props: ControllerProps) {
        super(props);
        this.premiumViewModel = new PremiumViewModel();
    }

    public subscribe = async (price: number) => {
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
        await fetch(`${apiPath}/subscription/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                price: price
            })
        });
        this.premiumViewModel.openPopup();
    };

    public deleteSubscription = async () => {
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
        await fetch(`${apiPath}/subscription/unsubscribe`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem('token') || ''
            }
        });
        this.premiumViewModel.openPopup();
    };

    render() {
        return <PremiumView
            subscribe={this.subscribe}
            deleteSubscription={this.deleteSubscription}
        />;
    }
}