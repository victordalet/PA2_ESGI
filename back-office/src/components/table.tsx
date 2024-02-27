import React, {useEffect} from "react";
import {ResponseIllegibleMessage} from "../app/@types/message";


export interface TableData {
    head: string[],
    body: string[][],
}

export class Table extends React.Component  <TableData> {

    data = this.props;


    render() {

        return (
            <div className="table">
                <div className={"table-header"}>
                    {
                        this.data.head.map((data) => (
                            <div className="header__item"><a className="filter__link" href="#"> {data}</a></div>
                        ))
                    }
                </div>
                <div className={'table-content'}>
                    {
                        this.data.body.map(dataLine => (
                            <div className={'table-row'}>
                                {dataLine.map(dataColumn => (
                                    <div className="table-data">{dataColumn}</div>
                                ))}
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }


}