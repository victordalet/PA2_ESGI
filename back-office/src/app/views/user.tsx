import {resultData, ViewProps} from "../@types/user";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";

export default class UserView extends React.Component<ViewProps> {
    render() {
        const {
            data,
            isPremiumFilter,
            searchFilter,
            ruleFilter
        } = this.props;


        return (
            <div>
                <Navbar/>
                <div className="container-user">
                    <h2>User</h2>
                    <div className="container-filter">
                        <input
                            onChange={searchFilter}
                            type="text"
                            id={"search"}
                            placeholder="Entrée votre mail..."
                        />
                        <input onChange={ruleFilter}
                               type={"text"}
                               id={"role"}
                               placeholder={"role..."}/>
                        <div className="premium-checkbox">
                            <label htmlFor="premium">Premium</label>
                            <input
                                onChange={isPremiumFilter}
                                type="checkbox"
                                name="premium"
                                id="premium"
                                value="premium"
                            />
                        </div>
                    </div>
                </div>
                <div className="table">
                    <div className={"table-header"}>
                        {
                            ["mail", "role", "address", "premium"].map((data) => (
                                <div className="header__item"><a className="filter__link" href="#"> {data}</a></div>
                            ))
                        }
                    </div>
                    <div className={'table-content'}>
                        {
                            data.map(dataLine => (
                                <div className={'table-row'}>
                                    {[dataLine.email,
                                        dataLine.rules,
                                        dataLine.address,
                                        dataLine.premium.toString()].map(dataColumn => (
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
