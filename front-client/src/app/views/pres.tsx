import React from "react";

export class PresView extends React.Component {
    render() {
        return <div className={"container-pres-pages"}>
            <h1>Welcome to PCS</h1>
            <div className={"container-client"}>
                <h2>Client</h2>
                <p>Client page</p>
                <button onClick={() => {
                    window.location.href = "/";
                }}>Reserve
                </button>
            </div>
            <div className={"container-bail"}>
                <h2>Client</h2>
                <p>Client page</p>
                <button onClick={() => {
                    window.location.href = "http://localhost:3002/";
                }}>Reserve
                </button>
            </div>
            <div className={"container-services"}>
                <h2>Client</h2>
                <p>Client page</p>
                <button onClick={() => {
                    window.location.href = "http://localhost:3003/";
                }}>Reserve
                </button>
            </div>
            <div className={"container-contacts"}></div>
        </div>;
    }
}