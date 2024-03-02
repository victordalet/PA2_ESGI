import React from "react";
import {Navbar} from "../../components/navbar";
import {PopupError} from "../../components/popup";
import {ViewProps} from "../@types/premium";

export class PremiumView extends React.Component <ViewProps> {
    render() {

        const {subscribe, deleteSubscription} = this.props;

        return (
            <div>
                <Navbar/>
                <PopupError text={"Action successful"}/>
                <div className="container-premium">
                    <h2>PREMIUM OFFER</h2>
                    <div className="container-comp">
                        <div className={"free"}>
                            <h3>Free</h3>
                            <h3 id={"price"}>0€</h3>
                            <ul>
                                <li><i className="ai-circle-minus-fill"></i>Removal of advertising</li>
                                <li><i className="ai-circle-minus-fill"></i>Permanent reduction of 5%</li>
                                <li><i className="ai-circle-minus-fill"></i>Services offered</li>
                                <li><i className="ai-circle-minus-fill"></i>Services VIP</li>
                                <li><i className="ai-circle-minus-fill"></i>Renewal bonus of the subscription</li>
                            </ul>
                            <button onClick={deleteSubscription}>Revoke</button>
                        </div>
                        <div className={"premium"}>
                            <h3>Bag Packer</h3>
                            <h3 id={"price"}>9.90€ /mouth</h3>
                            <ul>
                                <li><i className="ai-circle-plus-fill"></i>removal of advertising</li>
                                <li><i className="ai-circle-minus-fill"></i>permanent reduction of 5%</li>
                                <li><i className="ai-circle-plus-fill"></i>Services offered</li>
                                <li><i className="ai-circle-minus-fill"></i>Services VIP</li>
                                <li><i className="ai-circle-plus-fill"></i>Renewal bonus of the subscription</li>
                            </ul>
                            <button onClick={() => subscribe(10)}>Subscribe</button>
                        </div>
                        <div className={"premium"}>
                            <h3>Exploratory</h3>
                            <h3 id={"price"}>19€ /mouth</h3>
                            <ul>
                                <li><i className="ai-circle-plus-fill"></i>removal of advertising</li>
                                <li><i className="ai-circle-plus-fill"></i>permanent reduction of 5%</li>
                                <li><i className="ai-circle-plus-fill"></i>Services offered</li>
                                <li><i className="ai-circle-plus-fill"></i>Services VIP</li>
                                <li><i className="ai-circle-plus-fill"></i>Renewal bonus of the subscription</li>
                            </ul>
                            <button onClick={() => subscribe(19)}>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}