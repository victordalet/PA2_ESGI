import React from "react";

export interface CardInfo {
    title: string;
    description: string;
    price: number;
    location?: string;
}

export interface CardProps {
    cardInfo: CardInfo;
    onclick?: () => void;
}

export class Card extends React.Component<CardProps> {


    render() {

        const {cardInfo, onclick} = this.props;

        return (
            <div className={"card"} onClick={onclick}>
                <h3>{cardInfo.title}</h3>
                <p>{cardInfo.description}</p>
                <h4>Price : {cardInfo.price}
                    {cardInfo.location !== undefined ? <span>Location : {cardInfo.location}</span> : ''}
                </h4>
            </div>
        );
    }

}