import {ViewProps} from "../@types/ressources";
import React from "react";
import {Navbar} from "../../components/navbar";
import {Language} from "../../components/language";
import {Card} from "../../components/card";

export default class ResourcesView extends React.Component<ViewProps> {
    render() {

        const {
            location,
            service,
            filterResourcesByNameOrDescription,
            filterResourcesByPrice,
            filterResourcesByType
        } = this.props;

        return (
            <div>
                <Navbar/>
                <Language/>
                <div className={"container-resources"}>
                    <h1>My Resources</h1>
                    <div className={"filter"}>
                        <input onChange={filterResourcesByNameOrDescription} type={"text"} id={"search"}
                               placeholder={"Search..."}/>
                        <input onChange={filterResourcesByPrice} type={"number"} id={"price"} placeholder={"Price..."}/>
                        <select onChange={filterResourcesByType} name={"type"} id={"type"}>
                            <option value={"location"}>Location</option>
                            <option value={"service"}>Service</option>
                        </select>
                    </div>
                    <div className={'grid'}>
                        {
                            location.map((l, index) => (
                                <Card
                                    onclick={() => {
                                        const sourcePath = process.env.FRONT_CLIENT_PORT || 'http://localhost:3003';
                                        window.open(`${sourcePath}/reserve?` + l.id, '_blank');
                                    }}
                                    key={index}
                                    cardInfo={{
                                        title: l.name,
                                        description: '',
                                        price: l.price,
                                        type: 'location',
                                        id: l.id
                                    }}
                                />
                            ))
                        }
                        {
                            service.map((s, index) => (
                                <Card
                                    key={index}
                                    cardInfo={{
                                        title: s.name,
                                        description: (<div>{
                                            Array.from(Array(5).keys()).map((i) => {
                                                if (s.notation) {
                                                    if (i < s.notation) {
                                                        return <i className="ai-star"
                                                                  color={"#d3ae1b"}></i>;
                                                    }
                                                }
                                                return <i className="ai-star" color={"#fff"}></i>;
                                            })
                                        }</div>),
                                        price: s.price,
                                        type: 'service',
                                        id: s.id
                                    }}
                                />
                            ))
                        }
                    </div>
                </div>

            </div>
        );
    }
}