import React, {PureComponent} from 'react';
import {ViewProps} from "../@types/Connection";
import {PopupError} from "../../components/popup";
import {Language} from "../../components/language";

export default class Connection extends PureComponent<ViewProps> {
    render() {

        const {
            testLogin,
            onInputChange,
            askBail
        } = this.props;

        return (
            <div className={"login-page"}>
                <PopupError text={"Connection failed"}/>
                <PopupError text={"All field are required"}/>
                <PopupError text={"Your application to become a lessor has been sent"}/>
                <Language/>
                <div className={"container-log"}>
                    <div className={"log"}>
                        <h3>Log in</h3>
                        <form action="">
                            <input onChange={
                                onInputChange('email')
                            } className={"filed"} type="text" id={"email"} placeholder="Email"/>
                            <input onChange={
                                onInputChange('password')
                            } className={"filed"} type="password" id={"password"} placeholder="Password"/>
                        </form>


                        <button type="submit" onClick={testLogin} className={"submit"}>Log in</button>
                        <button type={"submit"} onClick={askBail} className={"submit"}>Request access</button>
                    </div>
                </div>
            </div>
        );
    }
}
