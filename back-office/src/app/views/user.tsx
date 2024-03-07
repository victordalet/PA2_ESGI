import {resultData, ViewProps} from '../@types/user';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class UserView extends React.Component <ViewProps> {
    render() {

        const {
            data
        } = this.props;


        return (

            <div>
                <Navbar/>
                <Table body={data.map((el: resultData) => [el.email, el.rules, el.address, el.premium.toString()])}
                       head={["mail", "role", "address", "premium"]}/>
            </div>
        );
    }
}