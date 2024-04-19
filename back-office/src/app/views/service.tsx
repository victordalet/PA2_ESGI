import {resultData, ViewProps} from "../@types/service";
import React from "react";
import {Navbar} from "../../components/navbar";

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
                    <div className={'table-content'}>
                        {
                            data.map(dataLine => (
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
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
