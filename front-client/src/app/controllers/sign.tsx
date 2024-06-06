import {ControllerProps, ControllerState} from "../@types/sign";
import {SignView} from "../views/sign";
import React from "react";
import SignViewModels from "../view-models/sign";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    private signViewModels: SignViewModels;

    constructor(props: ControllerProps) {
        super(props);
        this.signViewModels = new SignViewModels();
    }

    public signIn = () => {
        const email = document.querySelector<HTMLInputElement>('#email');
        const name = document.querySelector<HTMLInputElement>('#name');
        const city = document.querySelector<HTMLInputElement>('#city');
        const password = document.querySelector<HTMLInputElement>('#password');
        if (email && name && city && password) {
            if (this.signViewModels.FieldIsEmpty(email.value, password.value, password.value)) {
                this.signViewModels.openPopup();
            } else if (!this.signViewModels.isGoodPassword(password.value, password.value)) {
                this.signViewModels.openPopup();
            } else if (!this.signViewModels.isGoodEmail(email.value)) {
                this.signViewModels.openPopup();
            } else {
                const apiPath: string = process.env.API_PATH || 'https://apipcs.c2smr.fr';
                fetch(`${apiPath}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.value,
                        name: name.value,
                        address: city.value,
                        password: password.value
                    })
                }).then(response => {
                    document.location.href = '/login';
                });
            }
        }

    };


    render() {

        return <SignView
            signIn={this.signIn}
        />;
    }

}