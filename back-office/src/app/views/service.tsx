import {resultData, ViewProps} from "../@types/service";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Schedule} from "../@types/provider";

export default class ServiceView extends React.Component<ViewProps> {
    render() {
        const {
            data,
            priceFilter,
            searchFilter,
            deleteService,
            isValidateFilter,
            acceptService
        } = this.props;


        const dates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


        return (
            <div>
                <Navbar/>
                <div className="container-user">
                    <h2>Providers</h2>
                    <div className="container-filter">
                        <input
                            onChange={searchFilter}
                            type={"text"}
                            id={"search"}
                            placeholder={"Entrée le nom..."}
                        />
                        <input
                            onChange={priceFilter}
                            type={"number"}
                            id={"budget"}
                            autoComplete={"none"}
                            placeholder={"Prix max"}
                        />{" "}
                        <div className="premium-checkbox">
                            <label htmlFor={"is_valid"}>Unvalidated</label>
                            <input
                                onChange={isValidateFilter}
                                type={"checkbox"}
                                id={"is_valid"}
                                autoComplete={"none"}/>
                        </div>
                    </div>
                </div>

                <div className="table">
                    <div className={"table-header"}>
                        {
                            ["by", "name", "price", "duration", "nb utilisation", "siret", "Action"].map((data) => (
                                <div className="header__item"><a className="filter__link" href="#"> {data}</a></div>
                            ))
                        }
                    </div>
                    <div className={'table-content'} style={{height: '100%', marginBottom: 200}}>
                        {
                            data.map(dataLine => (
                                <div>
                                    <div className={'table-row'}>
                                        {[dataLine.created_by,
                                            dataLine.name,
                                            dataLine.price.toString(),
                                            dataLine.duration.toString(),
                                            dataLine.nb_use.toString(),
                                            dataLine.siret,
                                            (<i
                                                style={{
                                                    color: dataLine.is_valid ? "#c90b1a" : "#11963f",
                                                    cursor: 'pointer',
                                                    fontSize: '2em'
                                                }}
                                                onClick={() => {
                                                    dataLine.is_valid ?
                                                        deleteService(dataLine.id) :
                                                        acceptService(dataLine.id);
                                                }}
                                                className={dataLine.is_valid ? "ai-circle-minus-fill" : "ai-circle-plus-fill"}></i>)
                                        ].map(dataColumn => (
                                            <div className="table-data">{dataColumn}</div>
                                        ))}
                                    </div>
                                    <div className={'table-row'}>
                                        {
                                            dates.map(day => (
                                                <div className="table-data">{day}</div>
                                            ))
                                        }
                                    </div>
                                    <div className={'table-row'} style={{background: '#fff'}}>
                                        {

                                            dataLine.schedule.split('start":"').map((schedule: any, index) => (
                                                index !== 0 ?
                                                    <div className="table-data">
                                                        {schedule.split('"')[0]} - {schedule.split('end":"')[1].split('"')[0]}
                                                    </div>
                                                    : ''
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
