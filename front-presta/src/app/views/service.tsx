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

        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
                        <input id={"city"} type={"text"} placeholder={"City"}/>
                        <select id={"type-service"}>
                            <option value="NORMAL">NORMAL</option>
                            <option value="VIP">VIP</option>
                        </select>
                        <h3>Your schedule : </h3>
                        <div className={"calendar-schedule"}>
                            {
                                days.map((day) => {
                                    return (
                                        <div className={"day-wrapper"}>
                                            <h3>{day}</h3>
                                            <input type={"time"} id={"start-" + day}/>
                                            <input type={"time"} id={"end-" + day}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <button id={"submit"} onClick={createService}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}