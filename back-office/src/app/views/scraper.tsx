import React from "react";
import {Navbar} from "../../components/navbar";
import {ViewProps} from "../@types/scraper";
import {PopupError} from "../../components/popup";

export default class ScraperView extends React.Component<ViewProps> {
    render() {

        const {types, scrape} = this.props;

        return (
            <div>
                <Navbar/>
                <PopupError text={"Scrapping in process"}/>
                <PopupError text={"Warning: Scraper potentially not up to date"}/>
                <div className={'container-scraper'}>
                    <h1>Scraper</h1>
                    <div className={"form"}>
                        <label htmlFor="type">Type</label>
                        <select className={"form-control"} id="type">
                            {types.map((type, index) => {
                                return <option key={index} value={type}>{type}</option>;
                            })}
                        </select>
                        <input type={"number"} id={"nb_max"} placeholder={"Nb fetch"}/>
                        <button className={"btn btn-primary"} onClick={scrape}>Scrape</button>
                    </div>
                </div>
            </div>
        );
    }
}