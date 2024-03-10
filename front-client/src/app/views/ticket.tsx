import {Navbar} from "../../components/navbar";
import {ViewProps} from "../@types/ticket";
import React from "react";
import {PopupError} from "../../components/popup";

export default class TicketView extends React.Component<ViewProps> {

    render() {

        const {createTicket} = this.props;


        return (
            <div>
                <Navbar/>
                <PopupError text={"All fields are required"}/>
                <PopupError text={"Ticket created"}/>
                <div className="container-ticket">
                    <h2>Create new ticket</h2>
                    <div className={"ticket-form"}>
                        <input className={"ticket-input"} type="text" placeholder="Title"/>
                        <textarea className={"ticket-textarea"} placeholder="Description"/>
                        <button onClick={createTicket} className={"ticket-button"}>Create</button>
                    </div>
                </div>
            </div>
        );
    }
}