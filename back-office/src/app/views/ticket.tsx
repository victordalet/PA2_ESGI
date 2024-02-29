import {DataResponse, ViewProps} from '../@types/ticket';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class TicketView extends React.Component <ViewProps> {
    render() {

        const {data} = this.props;

        return (
            <div>
                <Navbar/>
                <Table
                    body={data.map((el: DataResponse) => [el.created_by, el.created_at, el.name, el.status, el.occupy_by])}
                    head={["creator", "create at", "name", "status", "occupy by"]}/>
            </div>
        );
    }
}