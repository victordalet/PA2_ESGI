import React from "react";
import {Navbar} from "../../components/navbar";

export  class SettingsView extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className={"container-settings"}>
                    <h2>Settings</h2>
                </div>
            </div>
        );
    }
}