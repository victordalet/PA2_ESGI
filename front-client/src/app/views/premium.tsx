import React from "react";
import {Navbar} from "../../components/navbar";
import {Popup} from "react-leaflet";
import {PopupError} from "../../components/popup";

export class PremiumView extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <PopupError text={"Revoke"}/>
                <div className="container-premium">
                    <h2>PREMIUM OFFER</h2>
                    <div className="container-comp">
                        <div className={"free"}>
                            <h3>Starter</h3>
                            <h3 id={"price"}>0€</h3>
                            <ul>
                                <li><i className="ai-circle-minus-fill"></i>Automatic reduction</li>
                                <li><i className="ai-circle-minus-fill"></i>Support the project</li>
                                <li><i className="ai-circle-minus-fill"></i>removal of advertising</li>
                            </ul>
                            <button>Revoke</button>
                        </div>
                        <div className={"premium"}>
                            <h3>Premium</h3>
                            <h3 id={"price"}>9.99€ /mouth</h3>
                            <ul>
                                <li><i className="ai-circle-plus-fill"></i>Automatic reduction</li>
                                <li><i className="ai-circle-plus-fill"></i>Support the project</li>
                                <li><i className="ai-circle-plus-fill"></i>removal of advertising</li>
                            </ul>
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}