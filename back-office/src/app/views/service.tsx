import {resultData, ViewProps} from '../@types/service';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class ServiceView extends React.Component <ViewProps> {
    render() {

        const {data} = this.props;

        return (
            <div>
                <Navbar/>
                <Table head={["by", "name", "price", "duration", "nb utilisation"]}
                       body={data.map((d: resultData) => [d.created_by, d.name, d.price.toString(), d.duration.toString(), d.nb_use.toString()])}/>
            </div>
        );
    }
}