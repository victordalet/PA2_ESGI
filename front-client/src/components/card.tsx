import React from "react";

export interface CardInfo {
    title: string;
    description: string;
    price: number;
    location?: string;
    type: string;
    id: number;
}

export interface CardProps {
    cardInfo: CardInfo;
    onclick?: () => void;
}

export class Card extends React.Component<CardProps> {

    private getPicture = async (type: string, id: number) => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        return await fetch(`${apiPath}/picture/${type}-${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
    };

    render() {

        const {cardInfo, onclick} = this.props;
        this.getPicture(cardInfo.type, cardInfo.id).then(async (response) => {
            const card = document.querySelector<HTMLElement>(`#card-${cardInfo.type}-${cardInfo.id}`);
            if (card) {
                if (response.status !== 500) {
                    const data = await response.json();
                    const imgBase64 = `data:image/png;base64,${data.base64}`;
                    card.style.backgroundImage = `url(${imgBase64})`;
                    card.style.opacity = '0.8';
                }

            }
        });

        return (
            <div className={"card"} id={`card-${cardInfo.type}-${cardInfo.id}`} onClick={onclick}>
                <h3>{cardInfo.title}</h3>
                <p>{cardInfo.description}</p>
                <h4>Price : {cardInfo.price}
                    {cardInfo.location !== undefined ? <span>Location : {cardInfo.location}</span> : ''}
                </h4>
            </div>
        );
    }

}