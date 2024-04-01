import React from "react";
import {PopupError} from "../../components/popup";
import {ViewProps} from "../@types/sign";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";

export class SignView extends React.Component<ViewProps> {


    render() {

        const {signIn} = this.props;

        return (
            <div className={"login-page"}>
                <PopupError text={"Fill in all fields"}/>
                <ChatBot/>
                <Language/>
                <div className={"container-log"}>
                    <div className={"log"}>
                        <h3>Sign in</h3>
                        <form action="">
                            <input className={"filed"} type="text" id={"email"} placeholder="Email"/>
                            <input className={"filed"} type="text" id={"name"} placeholder="Name"/>
                            <input className={"filed"} type="text" id={"city"} placeholder="City"/>
                            <input className={"filed"} type="password" id={"password"} placeholder="Password"/>
                        </form>


                        <button onClick={signIn} type="submit" className={"submit"}>Sign in</button>
                        <a href={'login'}>Log in</a>
                    </div>
                </div>
            </div>
        );
    }
}