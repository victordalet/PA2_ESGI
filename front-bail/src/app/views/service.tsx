import {Navbar} from "../../components/navbar";
import {Language} from "../../components/language";
import React from "react";
import {ViewProps} from "../@types/service";
import {PopupError} from "../../components/popup";

export default class ServiceView extends React.Component <ViewProps> {
    render() {

        const {
            createService,
            jobs,
            getPictureBackground
        } = this.props;

        return (
            <div>
                <Navbar/>
                <Language/>
                <PopupError text={"All fields are required"}/>
                <div className={"container-service"}>
                    <div className={"form"}>
                        <h2>Request to
                            <select id={"job"} onChange={getPictureBackground}>
                                {
                                    jobs.map((job) => {
                                        return (
                                            <option value={job.name}>{job.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </h2>
                        <input id={"email"} type={"text"} placeholder={"Company email"}/>
                        <input id={"title"} type={"text"} placeholder={"title"}/>
                        <input id={"siret"} type={"text"} placeholder={"siret"}/>
                        <input id={"description"} type={"text"} placeholder={"description"}/>
                        <input id={"price"} type={"number"} placeholder={"price"}/>
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