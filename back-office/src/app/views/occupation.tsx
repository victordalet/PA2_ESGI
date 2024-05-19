import React, {Component} from "react";
import {ViewProps} from "../@types/occupation";
import {Navbar} from "../../components/navbar";

export class OccupationView extends Component<ViewProps> {
    render() {

        const {
            data,
            filterOccupationMessage,
            filterOccupation,
            downloadFolderClientOccupation
        } = this.props;


        return <div>
            <Navbar/>
            <div className="container-user">
                <h2>Location Occupation</h2>
                <div className="container-filter">
                    <input onChange={filterOccupation} type="text" placeholder="Search Ocucupant" id={"search-occ"}/>
                    <input onChange={filterOccupationMessage} type={"number"} placeholder={"Number of messages"}
                           id={"search-nb-message"}/>
                </div>
            </div>

            <div className="table">
                <div className={"table-header"}>
                    {
                        ["LOCATION", "OCCUPANT", "FROM", "TO", "LINK", "DESCRIPTION", "DOSSIER", "ACCEPTED"].map((data) => (
                            <div className="header__item"><a className="filter__link"> {data}</a></div>
                        ))
                    }
                </div>
                <div className={'table-content'}>
                    {
                        data.map(dataLine => (
                            <div className={'table-row'}>
                                {[dataLine.location_name,
                                    dataLine.user_email,
                                    new Date(dataLine.from_datetime).toLocaleDateString('fr-FR') + ' ' + new Date(dataLine.from_datetime).toLocaleTimeString('fr-FR'),
                                    new Date(dataLine.to_datetime).toLocaleDateString('fr-FR') + ' ' + new Date(dataLine.to_datetime).toLocaleTimeString('fr-FR'),
                                    (<span
                                        style={{cursor: 'pointer', textDecoration: 'underline'}}
                                        onClick={() => {
                                            const sourcePath = process.env.FRONT_CLIENT_PORT || 'http://localhost:3003';
                                            window.open(`${sourcePath}/reserve?` + dataLine.location_id, '_blank');
                                        }}> link</span>),
                                    dataLine.description,
                                    (<span
                                        style={{cursor: 'pointer', textDecoration: 'underline'}}
                                        onClick={() => downloadFolderClientOccupation(dataLine.location_occupation_id)}> Download </span>),
                                    (<div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <i
                                            className={"ai-check"}
                                            style={{
                                                cursor: 'pointer',
                                                background: 'green',
                                                color: 'white',
                                                borderRadius: '50%',
                                                padding: '5px'
                                            }}
                                            onClick={() => {
                                                alert('Accept');
                                            }}> </i>
                                        <i
                                            className={"ai-thumbs-down"}
                                            style={{
                                                cursor: 'pointer',
                                                background: 'red',
                                                color: 'white',
                                                borderRadius: '50%',
                                                padding: '5px'
                                            }}
                                            onClick={() => {
                                                alert('Reject');
                                            }}> </i>
                                    </div>)
                                ].map(dataColumn => (
                                    <div className="table-data">{dataColumn}</div>
                                ))}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={"container-state"}>
                <h2>Choice date of State of play</h2>
                <input type="datetime-local" id={"input-state-time"}/>
                <h2>Confirm Start and end Date</h2>
                <input type="datetime-local" id={"input-start-time"}/>
                <input type="datetime-local" id={"input-end-time"}/>
                <button>Send</button>
            </div>

        </div>;
    }
}