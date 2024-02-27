import {ViewProps} from '../@types/service';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class ServiceView extends React.Component <ViewProps> {
    render() {
        return (
            <div>
                <Navbar/>
                <Table head={[]} body={[]}/>
            </div>
        );
    }
}