import React from "react";

export interface CardProps {
    title: string;
    description: string;
    price: number;
    location?: string;
}

export class Card extends React.Component<{ cardInfo: CardProps }> {


    render() {

        const {cardInfo} = this.props;

        return (
            <div className={"card"}>
                <h3>{cardInfo.title}</h3>
                <p>{cardInfo.description}</p>
                <h4>Price : {cardInfo.price}
                    {cardInfo.location !== undefined ? <span>Location : {cardInfo.location}</span> : ''}</h4>
            </div>
        );
    }

}