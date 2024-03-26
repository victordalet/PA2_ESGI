import React from "react";
import {Navbar} from "./navbar";

export class Loading extends React.Component {

    render() {
        return (
            <div>
                <Navbar/>
                <div className={"container-loading"}>
                    <h1>Loading <span>.</span><span>.</span><span>.</span></h1>
                </div>
            </div>
        );
    }

}