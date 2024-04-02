import React from "react";
import {Navbar} from "../../components/navbar";
import {PopupError} from "../../components/popup";
import {ViewProps} from "../@types/settings";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";

export class SettingsView extends React.Component <ViewProps> {
    
    deleteUser = async () => {
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
    
    
    render() {

        const {changeEmail, changePassword, changeUsername, data} = this.props;

        return (
            <div>
                <Navbar/>
                <ChatBot/>
                <Language/>
                <PopupError text={"Passwords do not match"}/>
                <PopupError text={"Change Successful"}/>
                <div className={"container-settings"}>
                    <h2>Settings</h2>
                    <div className={"container-box-settings"}>
                        <div className={"box"}>
                            <h3>Change password</h3>
                            <input type="password" id={"password"} placeholder={"New password..."}/>
                            <input type="password" id={"confirmPassword"} placeholder={"Confirm new password..."}/>
                            <button onClick={changePassword}>Change password</button>
                        </div>
                        <div className={"box"}>
                            <h3>Change email</h3>
                            <input type="email" id={"email"} placeholder={"New email..."} defaultValue={data.email}/>
                            <button onClick={changeEmail}>Change email</button>
                        </div>
                        <div className={"box"}>
                            <h3>Change username</h3>
                            <input type="text" id={"username"} placeholder={"New username..."}
                                   defaultValue={data.name}/>
                            <button onClick={changeUsername}>Change username</button>
                            <div className={"box"}>
                            <h3>Delete User</h3>
                            <button onClick={this.deleteUser}>Delete User</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}