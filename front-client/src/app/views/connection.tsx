import React, {PureComponent} from 'react';
import {ViewProps} from "../@types/Connection";
import {PopupError} from "../../components/popup";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";

export default class Connection extends PureComponent<ViewProps> {
    render() {

        const {
            testLogin,
            onInputChange
        } = this.props;

        return (
            <div className={"login-page"}>
                <PopupError text={"Connection failed"}/>
                <ChatBot/>
                <Language/>
                <div className={"container-log"}>
                    <div className={"log"}>
                        <h3>Log in</h3>
                        <form action="">
                            <input onChange={
                                onInputChange('email')
                            } className={"filed"} type="text" placeholder="Email"/>
                            <input onChange={
                                onInputChange('password')
                            } className={"filed"} type="password" placeholder="Password"/>
                        </form>


                        <button type="submit" onClick={testLogin} className={"submit"}>Log in</button>
                        <a href={'sign-in'}>Sign in</a>
                        <a href={'/home'}>Access with no account</a>
                    </div>
                </div>
            </div>
        );
    }
}
