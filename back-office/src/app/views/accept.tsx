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
                <div className="container-user">
                    <h2>Accept new lessor or service provider</h2>
                </div>
                <div className={"container-accept"}>
                    <Table head={['email | rules', 'accept']}
                           body={emails.map(e => [e, (<i
                               style={{color: '#0fad4e', cursor: 'pointer', fontSize: '2em'}}
                               onClick={() => {
                                   acceptEmail(e);
                               }}
                               className="ai-circle-plus-fill"></i>)])}/>
                </div>
            </div>
        );
    }
}