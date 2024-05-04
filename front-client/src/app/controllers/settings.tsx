import React from "react";
import {SettingsView} from "../views/settings";
import {ControllerProps, ControllerState} from "../@types/settings";
import {haveToken} from "../../security/token";
import SettingsViewModels from "../view-models/settings";
import {Loading} from "../../components/loading";
import {SettingsModel} from "../model/settings";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {

    private settingsViewModel: SettingsViewModels;
    private settingsModel: SettingsModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.settingsModel = new SettingsModel();
        this.settingsViewModel = new SettingsViewModels();
        this.fetchUser();
    }


    state: ControllerState = {
        data: []
    };


    public fetchUser = async () => {
        const response = await this.settingsModel.fetchUser();
        this.setState({data: response});
    };

    public changePassword = async () => {
        const password = document.querySelector<HTMLInputElement>('#password');
        const confirmPassword = document.querySelector<HTMLInputElement>('#confirmPassword');
        if (password && confirmPassword) {
            if (this.settingsViewModel.isGoodPassword(password.value, confirmPassword.value)) {
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
                this.settingsViewModel.openPopupSuccess();
            } else {
                this.settingsViewModel.openPopup();
            }
        } else {
            this.settingsViewModel.openPopup();
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
            this.settingsViewModel.openPopupSuccess();
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
            this.settingsViewModel.openPopupSuccess();
        }
    };


    render() {

        if (this.state.data.length === 0) {
            return <Loading/>;
        }

        return <SettingsView
            deleteUser={this.settingsModel.deleteUser}
            changeEmail={this.changeEmail}
            changePassword={this.changePassword}
            changeUsername={this.changeUsername}
            data={this.state.data.filter((data) => data.token === localStorage.getItem('token'))[0]}
        />;
    }


}