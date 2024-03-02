import {Navbar} from "../../components/navbar";
import React from "react";
import {ViewProps} from "../@types/reserve";

export class ReserveView extends React.Component <ViewProps> {


    render() {

        const {
            data,
            services
        } = this.props;

        return (
            <div>
                <Navbar/>
                <div className={"container-location-reservation"}>
                    <h1>{data.name}</h1>
                    <div className={"description"}>
                        <p>{data.description}</p>
                        <div className={"info"}>
                            <h3 id={"price"}><i className="ai-coin"></i>{data.price}</h3>
                            <h3 id={"location"}><i className="ai-map"></i>{data.address}</h3>
                            <h3 id={"contact"}><i className="ai-paper-airplane"></i>{data.created_by}</h3>
                            <ul className={"stars"}>
                                <li><i className="ai-star"></i></li>
                                <li><i className="ai-star"></i></li>
                                <li><i className="ai-star"></i></li>
                                <li><i className="ai-star"></i></li>
                                <li><i className="ai-star"></i></li>
                            </ul>
                            {
                                /*
                             <div className={"reservation"}>
                                <input type={"date"} id={"date-start"}/>
                                <input type={"date"} id={"date-end"}/>
                                <button id={"reserve"}>Reserve</button>
                            </div>
                            */
                            }
                            <div className={"reservation"}>
                                <button id={"cancer"} style={{marginBottom: '20px', background : '#c91919'}}>Cancel</button>
                                <button id={"facture"}>My facture</button>
                            </div>
                        </div>
                    </div>

                    <div className={"calendar"}>
                    </div>
                    <div className={"if-is-buy"}>
                        <div className={"notation"}>
                            <h3>Notation</h3>
                            <ul className={"stars"}>
                                <li><i className="ai-star"></i></li>
                                <li><i className="ai-star"></i></li>
                                <li><i className="ai-star"></i></li>
                                <li><i className="ai-star"></i></li>
                                <li><i className="ai-star"></i></li>
                            </ul>
                        </div>

                        <div className={"container-message"}>
                            <h3>Messages</h3>
                            <div className={"messages"}>
                                <div className={"message"}>
                                    <p>Message 1</p>
                                </div>
                                <div className={"message"}>
                                    <p>Message 2</p>
                                </div>
                                <div className={"message"}>
                                    <p>Message 3</p>
                                </div>
                            </div>
                            <input type={"text"} id={"message"}/>
                            <i className={"ai-paper-airplane"}></i>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}