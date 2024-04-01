import {DataResponse, ViewProps} from "../@types/location";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";

export default class LocationView extends React.Component<ViewProps> {
    render() {
        const {
            data,
            capacityFilter,
            priceFilter,
            searchFilter,
            deleteLocation
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
                    </div>
                </div>

                <div className="table">
                    <div className={"table-header"}>
                        {
                            ["by", "name", "price", "is_occupy_by", "nb address", "capacity", "type", "delete"].map((data) => (
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
                                        dataLine.is_occupy_by,
                                        dataLine.address,
                                        dataLine.capacity,
                                        dataLine.type,
                                        (<i
                                            style={{color: '#c90b1a', cursor: 'pointer', fontSize: '2em'}}
                                            onClick={() => {
                                                deleteLocation(dataLine.id.toString());
                                            }}
                                            className="ai-circle-minus-fill"></i>)
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
