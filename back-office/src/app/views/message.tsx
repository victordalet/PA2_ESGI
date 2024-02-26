import {ViewProps} from '../@types/message';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class MessageView extends React.Component <ViewProps> {
    render() {
        return (
            <div>
                <Navbar/>
                <Table/>
                <div className={"container-add-message"}>
                    <div className="input">
                        <input type="email" placeholder="New bad word"></input>
                        <button type="submit"><i className={"ai-send"}></i></button>
                    </div>
                </div>
            </div>
        );
    }
}