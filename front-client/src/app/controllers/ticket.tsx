import {ControllerProps, ControllerState} from "../@types/ticket";
import React from "react";
import TicketView from "../views/ticket";
import {haveToken} from "../../security/token";
import TicketViewModel from "../view-models/ticket";

export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    private ticketViewModel: TicketViewModel;

    constructor(props: ControllerProps) {
        super(props);
        haveToken();
        this.ticketViewModel = new TicketViewModel();
    }

    public createTicket = async () => {
        const title = document.querySelector<HTMLInputElement>(".ticket-input");
        const description =
            document.querySelector<HTMLTextAreaElement>(".ticket-textarea");
        if (title && description) {
            if (title.value === "" || description.value === "") {
                this.ticketViewModel.openPopup(0);
            } else {
                const apiPath = process.env.API_HOST || "http://localhost:3001";
                await fetch(`${apiPath}/ticket`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: localStorage.getItem("token") || "",
                    },
                    body: JSON.stringify({
                        name: title.value,
                        description: description.value,
                    }),
                });
                this.ticketViewModel.openPopup(1);
                title.value = "";
                description.value = "";
            }
        }
    };

    render() {
        return <TicketView createTicket={this.createTicket}/>;
    }
}
