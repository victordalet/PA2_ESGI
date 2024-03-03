import {Navbar} from "../../components/navbar";
import React from "react";
import {ViewProps} from "../@types/reserve";
import {PopupError} from "../../components/popup";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";

export class ReserveView extends React.Component <ViewProps> {


    render() {

        const {
            data,
            services,
            isReserved,
            fetchReservations,
            addNotation,
            notation,
            messages,
            addMessage,
            deleteOccupation,
            downloadFacture
        } = this.props;

        return (
            <div>
                <Navbar/>
                <ChatBot/>
                <Language/>
                <PopupError text={"Bad date"}/>
                <PopupError text={"Note have been saved"}/>
                <div className={"container-location-reservation"}>
                    <h1>{data.name}</h1>
                    <div className={"description"}>
                        <p>{data.description}</p>
                        <div className={"info"}>
                            <h3 id={"price"}><i className="ai-coin"></i>{data.price}</h3>
                            <h3 id={"location"}><i className="ai-map"></i>{data.address}</h3>
                            <h3 id={"contact"}><i className="ai-paper-airplane"></i>{data.created_by}</h3>
                            {
                                !isReserved
                                    ? (
                                        <ul className={"stars"}>
                                            {
                                                [1, 2, 3, 4, 5].map((star, index) => {
                                                    return (
                                                        <li key={index}><i className="ai-star"
                                                                           style={(notation < star) ? {color: '#000'} : {color: '#d3ae1b'}}/>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    )
                                    : ''
                            }

                            {
                                !isReserved ?
                                    (
                                        <div className={"reservation"}>
                                            <input type={"date"} id={"date-start"}/>
                                            <input type={"date"} id={"date-end"}/>
                                            <button id={"reserve"} onClick={fetchReservations}>Reserve</button>
                                        </div>
                                    ) :
                                    (
                                        <div className={"reservation"}>
                                            <button id={"cancel"} onClick={deleteOccupation}
                                                    style={{marginBottom: '20px', background: '#c91919'}}>Cancel
                                            </button>
                                            <button id={"facture"} onClick={downloadFacture}>My facture</button>
                                        </div>
                                    )
                            }
                        </div>
                    </div>

                    <div className={"calendar"}>
                    </div>
                    {
                        isReserved ?
                            (
                                <div className={"if-is-buy"}>
                                    <div className={"notation"}>
                                        <h3>Notation</h3>
                                        <ul className={"stars"}>
                                            {
                                                [1, 2, 3, 4, 5].map((star, index) => {
                                                    return (
                                                        <li key={index} onClick={() => addNotation(star)}><i
                                                            className="ai-star"></i></li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </div>

                                    <div className={"container-message"}>
                                        <h3>Messages</h3>
                                        <div className={"messages"}>
                                            {
                                                messages.map((message, index) => {
                                                    return (
                                                        <div key={index} className={"message"}>
                                                            <p>{message.message}</p>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                        <input type={"text"} id={"message-input"}/>
                                        <i className={"ai-paper-airplane"} onClick={addMessage}></i>
                                    </div>
                                </div>
                            )
                            : ''

                    }
                </div>
            </div>
        );
    }
}