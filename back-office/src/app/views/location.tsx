import {DataResponse, ViewProps} from "../@types/location";
import React from "react";
import {Navbar} from "../../components/navbar";

export default class LocationView extends React.Component<ViewProps> {
    render() {
        const {
            data,
            capacityFilter,
            priceFilter,
            searchFilter,
            deleteLocation,
            isValidateFilter,
            acceptLocation
        } = this.props;

        return (
            <div>
                <Navbar/>
                <div className="container-user">
                    <h2>Location</h2>
                    <div className="container-filter">
                        <input
                            onChange={searchFilter}
                            type={"text"}
                            id={"search"}
                            placeholder={"Entrée le nom..."}
                        />
                        <div className="capacity">
                            <input
                                onChange={capacityFilter}
                                type={"number"}
                                id={"capacity"}
                                placeholder={"N°..."}
                            />{" "}
                        </div>
                        <div className="priceMax">
                            <input
                                onChange={priceFilter}
                                type={"number"}
                                id={"price"}
                                autoComplete={"none"}
                                placeholder={"Price max"}
                            />{" "}
                        </div>
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
                            ["by", "name", "price", "nb address", "capacity", "type", "ACTION", "DETAILS"].map((data) => (
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
                                        dataLine.address,
                                        dataLine.capacity,
                                        dataLine.type,
                                        (<i
                                            style={{
                                                color: dataLine.is_valid ? '#c90b1a' : '#11963f',
                                                cursor: 'pointer',
                                                fontSize: '2em'
                                            }}
                                            onClick={() => {
                                                dataLine.is_valid ?
                                                    deleteLocation(dataLine.id) :
                                                    acceptLocation(dataLine.id);
                                            }}
                                            className={dataLine.is_valid ? "ai-circle-minus-fill" : "ai-circle-plus-fill"}></i>),
                                        (<a
                                            onClick={() => {
                                                window.location.href = `http://localhost:3003/reserve?${dataLine.id}&a=false`;
                                            }}
                                            style={{
                                                cursor: 'pointer',
                                                textDecoration: 'underline',
                                            }}
                                        >Link</a>)
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
