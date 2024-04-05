import React from "react";
import {SettingsView} from "../views/settings";
import {ControllerProps, ControllerState} from "../@types/settings";
import {haveToken} from "../../security/token";
import SettingsViewModels from "../view-models/settings";
import {Loading} from "../../components/loading";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    private SettingsViewModel: SettingsViewModels;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.fetchUser();
        this.SettingsViewModel = new SettingsViewModels();
    }


    state: ControllerState = {
        data: []
    };


    public fetchUser = async () => {
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem('token') || ''
            }
        });
        this.setState({data: await response.json()});

    };

    public deleteUser = async () => {
        const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
        try {
            const response = await fetch(`${apiPath}/user`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem('token') || ''
                }
            });
            if (response.ok) {
                console.log("L'utilisateur a été supprimé avec succès !");

            } else {
                console.error("La suppression de l'utilisateur a échoué.");

            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression de l'utilisateur :", error);
        }
    };

    public changePassword = async () => {
        const password = document.querySelector<HTMLInputElement>('#password');
        const confirmPassword = document.querySelector<HTMLInputElement>('#confirmPassword');
        if (password && confirmPassword) {
            if (this.SettingsViewModel.isGoodPassword(password.value, confirmPassword.value)) {
                const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
                await fetch(`${apiPath}/user/password`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        "authorization": localStorage.getItem('token') || ''
                    },
                    body: JSON.stringify({
                        password: password.value
                    })
                });
                this.SettingsViewModel.openPopupSuccess();
            } else {
                this.SettingsViewModel.openPopup();
            }
        } else {
            this.SettingsViewModel.openPopup();
        }
    };

    public changeEmail = async () => {
        const email = document.querySelector<HTMLInputElement>('#email');
        if (email) {
            const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
            await fetch(`${apiPath}/user/email`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem('token') || ''
                },
                body: JSON.stringify({
                    email: email.value
                })
            });
            this.SettingsViewModel.openPopupSuccess();
        }
    };

    public changeUsername = async () => {
        const username = document.querySelector<HTMLInputElement>('#username');
        if (username) {
            const apiPath: string = process.env.API_HOST || 'http://localhost:3001';
            await fetch(`${apiPath}/user/username`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem('token') || ''
                },
                body: JSON.stringify({
                    name: username.value
                })
            });
            this.SettingsViewModel.openPopupSuccess();
        }
    };


    render() {

        if (this.state.data.length === 0) {
            return <Loading/>;
        }

        return <SettingsView
            deleteUser={this.deleteUser}
            changeEmail={this.changeEmail}
            changePassword={this.changePassword}
            changeUsername={this.changeUsername}
            data={this.state.data.filter((data) => data.token === localStorage.getItem('token'))[0]}
        />;
    }


}