import {ViewProps} from '../@types/ticket';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class TicketView extends React.Component <ViewProps> {
    render() {
        return (
            <div>
                <Navbar/>
                <Table/>
            </div>
        );
    }
}