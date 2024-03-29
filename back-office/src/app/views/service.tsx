import {resultData, ViewProps} from "../@types/service";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";

export default class ServiceView extends React.Component<ViewProps> {
    render() {
        const {
            data,
            priceFilter,
            searchFilter
        } = this.props;

        return (
            <div>
                <Navbar/>
                <div className="container-user">
                    <h2>Service</h2>
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
                    </div>
                </div>

                <div className="table">
                    <div className={"table-header"}>
                        {
                            ["by", "name", "price", "duration", "nb utilisation"].map((data) => (
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
                                        dataLine.nb_use.toString()
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
