import {ServiceResponse, ViewProps} from "../@types/service";
import React from "react";
import {Navbar} from "../../components/navbar";

export default class ServiceView extends React.Component<ViewProps> {
    render() {

        const {service} = this.props;

        return (
            <div>
                <Navbar/>
                <div className="container-service">
                    <div className="container-filter"></div>
                    <h2>Services</h2>
                    <div className={"container-card"}>
                        {
                            service.map((s: ServiceResponse) => {
                                return (
                                    <div className={"card"}>
                                        <h3>{s.name}</h3>
                                        <p>{s.description}</p>
                                        <p>{s.price}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}