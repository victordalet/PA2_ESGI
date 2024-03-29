import {Navbar} from "../../components/navbar";
import {Language} from "../../components/language";
import React from "react";
import {ViewProps} from "../@types/service";
import {PopupError} from "../../components/popup";

export default class ServiceView extends React.Component <ViewProps> {
    render() {

        const {createService} = this.props;

        return (
            <div>
                <Navbar/>
                <Language/>
                <PopupError text={"All fields are required"}/>
                <div className={"container-service"}>
                    <div className={"form"}>
                        <h2>Create new Service</h2>
                        <input id={"email"} type={"text"} placeholder={"Company email"}/>
                        <input id={"title"} type={"text"} placeholder={"title"}/>
                        <input id={"description"} type={"text"} placeholder={"description"}/>
                        <input id={"price"} type={"number"} placeholder={"price"}/>
                        <input id={"cat"} type={"text"} placeholder={"category"}/>
                        <input id={"duration"} type={"text"} placeholder={"Duration"}/>
                        <select id={"type-service"}>
                            <option value="CLIENT">Client</option>
                            <option value="BAIL">Bail</option>
                        </select>
                        <input id={"image"} type={"file"} placeholder={"image"}/>
                        <button id={"submit"} onClick={createService}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}