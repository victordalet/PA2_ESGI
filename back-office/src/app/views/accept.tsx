import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";
import {ViewProps} from "../@types/accept";

export default class AcceptView extends React.PureComponent<ViewProps> {


    render() {

        const {
            emails,
            acceptEmail
        } = this.props;


        return (
            <div>
                <Navbar/>
                <div className={"container-accept"}>
                    <h1>Accept New yawn</h1>
                    <Table head={['email', 'accept']}
                           body={emails.map(e => [e, (<i
                               style={{color: '#0fad4e', cursor: 'pointer', fontSize: '2em'}}
                               onClick={() => {
                                   acceptEmail(e);
                               }}
                               className="ai-circle-plus-fill"></i>)])}/>
                    {emails.map((el: string) => {
                        return (
                            <div className={"row"}>
                                <div className={"cell"}>{el}</div>
                                <div className={"cell"}>
                                    <button onClick={() => acceptEmail(el)}>Accept</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}