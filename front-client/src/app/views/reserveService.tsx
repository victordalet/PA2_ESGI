import React from "react";
import {Navbar} from "../../components/navbar";
import {ViewProps} from "../@types/reserveService";
import {PopupError} from "../../components/popup";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";

export default class ReserveServiceView extends React.Component<ViewProps> {

    render() {

        const {
            service,
            postNotation,
            isCreator,
            deleteService
        } = this.props;

        return (
            <div>
                <Navbar/>
                <ChatBot/>
                <Language/>
                <PopupError text={"Tank you for your notation"}></PopupError>
                <div className={"container-location-reservation"}>
                    <h1>{service.name}</h1>
                    <div className={"description"}>
                        <div className={"info"}>
                            <h3 id={"price"}><i className="ai-coin"></i>{service.price}</h3>
                            <h3 id={"location"}><i className="ai-alarm"></i>{service.duration}</h3>
                            <h3 id={"contact"}><i className="ai-paper-airplane"></i>{service.created_by}</h3>
                            {
                                isCreator ?
                                    <div className={"reservation"}>
                                        <button id={"cancel"} onClick={deleteService}
                                                style={{background: '#c91919'}}>Delete
                                        </button>
                                    </div>
                                    : ''
                            }
                        </div>
                    </div>
                    <div className={"if-is-buy"}>
                        {
                            isCreator ? '' :
                                <div className={"notation"}>
                                    <h3>Notation</h3>
                                    <ul className={"stars"}>
                                        {
                                            [1, 2, 3, 4, 5].map((star, index) => {
                                                return (
                                                    <li key={index} onClick={() => postNotation(star)}><i
                                                        className="ai-star"></i></li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>

                        }
                    </div>
                </div>
            </div>
        );
    }

}