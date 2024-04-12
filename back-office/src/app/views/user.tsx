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
            ruleFilter,
            deleteUser,
            addAdmin
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
                            ["mail", "role", "address", "premium", "remove", "admin"].map((data) => (
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
                                        dataLine.premium.toString(),
                                        (<i
                                            style={{color: '#c90b1a', cursor: 'pointer', fontSize: '2em'}}
                                            onClick={() => {
                                                deleteUser(dataLine.email);
                                            }}
                                            className="ai-circle-minus-fill"></i>),
                                        (
                                            <i
                                                style={dataLine.rules === 'ADMIN' ?
                                                    {color: '#c90b1a', cursor: 'pointer', fontSize: '2em'} :
                                                    {color: '#0f7e03', cursor: 'pointer', fontSize: '2em'}}
                                                onClick={() => {
                                                    addAdmin(dataLine.email);
                                                }}
                                                className={dataLine.rules == 'ADMIN' ?
                                                    "ai-circle-minus-fill" :
                                                    "ai-circle-plus-fill"}></i>
                                        )

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
