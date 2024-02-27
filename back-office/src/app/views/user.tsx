import {ViewProps} from '../@types/user';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class UserView extends React.Component <ViewProps> {
    render() {
        return (
            <div>
                <Navbar/>
                <Table body={[]} head={[]}/>
            </div>
        );
    }
}