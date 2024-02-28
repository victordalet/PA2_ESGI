import {ViewProps} from '../@types/location';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class LocationView extends React.Component <ViewProps> {
    render() {


        const {
            data
        } = this.props;

        return (
            <div>
                <Navbar/>
                <Table head={["location"]} body={[]}/>
            </div>
        );
    }
}