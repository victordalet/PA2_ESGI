import React from "react";
import {PremiumView} from "../views/premium";
import {ControllerProps, ControllerState} from "../@types/premium";
import PremiumViewModel from "../view-models/premium";
import {haveToken} from "../../security/token";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    private premiumViewModel: PremiumViewModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.premiumViewModel = new PremiumViewModel();
    }

    public subscribe = async (price: number) => {
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(`${apiPath}/subscription/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                price: price
            })
        });
        const data = await res.json();
        window.open(data.url, '_blank');
        this.premiumViewModel.openPopup();
    };

    public deleteSubscription = async () => {
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
        await fetch(`${apiPath}/subscription/unsubscribe`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem('token') || ''
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