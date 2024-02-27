import {ViewProps} from '../@types/location';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class LocationView extends React.Component <ViewProps> {
    render() {
        return (
            <div>
                <Navbar/>
                <Table head={[]} body={[]}/>
            </div>
        );
    }
}