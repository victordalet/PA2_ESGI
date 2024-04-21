import React, {Component} from "react";
import {ViewProps} from "../@types/occupation";
import {Navbar} from "../../components/navbar";

export class OccupationView extends Component<ViewProps> {
    render() {

        const {
            data,
            filterOccupationMessage,
            filterOccupation
        } = this.props;


        return <div>
            <Navbar/>
            <div className="container-user">
                <h2>Location</h2>
                <div className="container-filter">
                    <input onChange={filterOccupation} type="text" placeholder="Search Ocucupant" id={"search-occ"}/>
                    <input onChange={filterOccupationMessage} type={"number"} placeholder={"Number of messages"}
                           id={"search-nb-message"}/>
                </div>
            </div>

            <div className="table">
                <div className={"table-header"}>
                    {
                        ["LOCATION", "OCCUPANT", "FROM", "TO", "LINK", "NEW MESSAGES"].map((data) => (
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
                                    dataLine.from_datetime,
                                    dataLine.to_datetime,
                                    (<span
                                        style={{cursor: 'pointer', textDecoration: 'underline'}}
                                        onClick={() => {
                                            const sourcePath = process.env.FRONT_CLIENT_PORT || 'http://localhost:3003';
                                            window.open(`${sourcePath}/reserve?` + dataLine.location_id, '_blank');
                                        }}> link</span>),
                                    dataLine.nb_message
                                ].map(dataColumn => (
                                    <div className="table-data">{dataColumn}</div>
                                ))}
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>;
    }
}