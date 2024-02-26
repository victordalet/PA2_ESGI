import {ViewProps} from '../@types/language';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class LanguageView extends React.Component <ViewProps> {
    render() {
        return (
            <div>
                <Navbar/>
                <Table/>
                <label htmlFor="text" className="drop-container" id="dropcontainer">
                    <span className="drop-title">Drop files here</span>
                    or
                    <input type="file" id="images" accept="text/*" required/>
                </label>
            </div>
        );
    }
}