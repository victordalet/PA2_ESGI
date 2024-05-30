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
                    </div>
                    <div className={'grid'}>
                        {
                            location.map((l, index) => (
                                <Card
                                    onclick={() => {
                                        const sourcePath = process.env.FRONT_CLIENT_PORT || 'https://pcs.c2smr.Fr';
                                        window.open(`${sourcePath}/reserve?` + l.id, '_blank');
                                    }}
                                    key={index}
                                    cardInfo={{
                                        title: l.name,
                                        description: l.is_valid === 1 ? 'Valid' : 'currently being validated',
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
                                    onclick={() => {
                                        document.location = '/provider?id=' + s.id;
                                    }}
                                    cardInfo={{
                                        title: s.name,
                                        description: s.is_valid === 1 ? 'Valid' : 'currently being validated',
                                        price: s.price,
                                        type: s.name,
                                        id: 1
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