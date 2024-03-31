import {
    ControllerState,
    ResponseIllegibleMessage,
    ViewProps,
} from "../@types/message";
import React, {useEffect} from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";

export default class MessageView extends React.Component<ViewProps> {
    render() {
        const {onInputChange, addIllegibleMessage, data} = this.props;

        return (
            <div>
                <Navbar/>
                <div className="container-user">
                    <h2>Messages</h2>
                </div>
                <Table
                    head={["Created by", "Number of illegible words"]}
                    body={data.map((el: any) => [el.created_by, el.nb_illegible_words])}
                />
                <div className={"container-add-message"}>
                    <div className="input">
                        <input
                            type="email"
                            onChange={onInputChange("addInput")}
                            placeholder="New bad word"
                        ></input>
                        <button onClick={addIllegibleMessage} type="submit">
                            <i className={"ai-send"}></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
