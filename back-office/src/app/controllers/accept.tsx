import {ControllerProps, ControllerState} from "../@types/accept";
import React from "react";
import AcceptView from "../views/accept";
import {observer} from "mobx-react";
import {Navbar} from "../../components/navbar";

@observer
export default class Controller extends React.Component<
    ControllerProps,
    ControllerState
> {
    constructor(props: ControllerProps) {
        super(props);
        this.fetchEmails();
    }

    state = {
        emails: [],
    };

    private fetchEmails = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + "/user/get-request-bail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        const data = await response.json();
        console.log(data);
        this.setState({
            emails: data.map((el: any) => el.email),
        });
    };

    public acceptEmail = async (email: string) => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        await fetch(apiPath + "/user/accept-request-bail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        document.location.reload();
    };

    render() {
        if (this.state.emails.length === 0) {
            return <Navbar/>;
        }

        return (
            <AcceptView emails={this.state.emails} acceptEmail={this.acceptEmail}/>
        );
    }
}
