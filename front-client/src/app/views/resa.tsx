import React from "react";
import {Navbar} from "../../components/navbar";

export class ResaView extends React.Component {

    render() {
        return (
            <div>
                <Navbar/>
                <div className={"container-resa"}>
                    <h2>Your Reservation</h2>
                </div>
            </div>
        );
    }
}