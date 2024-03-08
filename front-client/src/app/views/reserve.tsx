import {Navbar} from "../../components/navbar";
import React from "react";
import {ViewProps} from "../@types/reserve";
import {PopupError} from "../../components/popup";
import {ChatBot} from "../../components/chatBot";
import {Language} from "../../components/language";
import {Card} from "../../components/card";

export class ReserveView extends React.Component <ViewProps> {


    render() {

        const {
            data,
            services,
            isReserved,
            fetchReservations,
            addNotation,
            notation,
            messages,
            addMessage,
            deleteOccupation,
            downloadFacture,
            isBail,
            deleteLocation,
            description,
            servicesGlobal,
            addService,
            servicesSelected
        } = this.props;

        let cardToRemoveIndex = 0;


        return (
            <div>
                <Navbar/>
                <ChatBot/>
                <Language/>
                <PopupError text={"Bad date"}/>
                <PopupError text={"Note have been saved"}/>
                <div className={"container-location-reservation"}>
                    <h1>{data.name}</h1>
                    <div className={"description"}>
                        <div className={"description-text"}>
                            {
                                description ?
                                    (
                                        <div>
                                            <h3><span>Concierge :</span>{description.typeConcierge}</h3>
                                            <h3><span>Address :</span>{description.address}</h3>
                                            <h3><span>Country :</span>{description.country}</h3>
                                            <h3><span>Type :</span>{description.type}</h3>
                                            <h3><span>Type de location :</span>{description.typeLocation}</h3>
                                            <h3><span>Number room :</span>{description.numberRoom}</h3>
                                            <h3><span>Surface :</span>{description.surface}</h3>
                                            <h3><span>Info sup : </span></h3>
                                        </div>
                                    ) : ''
                            }
                        </div>
                        <div className={"info"}>
                            <h3 id={"price"}><i className="ai-coin"></i>{data.price}</h3>
                            <h3 id={"location"}><i className="ai-map"></i>{data.address}</h3>
                            <h3 id={"contact"}><i className="ai-paper-airplane"></i>{data.created_by}</h3>
                            {
                                !isReserved
                                    ? (
                                        <ul className={"stars"}>
                                            {
                                                [1, 2, 3, 4, 5].map((star, index) => {
                                                    return (
                                                        <li key={index}><i className="ai-star"
                                                                           style={(notation < star) ? {color: '#000'} : {color: '#d3ae1b'}}/>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    )
                                    : ''
                            }

                            {
                                isBail ?
                                    (
                                        <div className={"reservation"}>
                                            <button id={"cancel"} onClick={deleteLocation}
                                                    style={{background: '#c91919'}}>Delete
                                            </button>
                                        </div>
                                    )
                                    :

                                    (!isReserved ?
                                        (
                                            <div className={"reservation"}>
                                                <input type={"date"} id={"date-start"}/>
                                                <input type={"date"} id={"date-end"}/>
                                                <button id={"reserve"} onClick={fetchReservations}>Reserve</button>
                                            </div>
                                        ) :
                                        (
                                            <div className={"reservation"}>
                                                <button id={"cancel"} onClick={deleteOccupation}
                                                        style={{marginBottom: '20px', background: '#c91919'}}>Cancel
                                                </button>
                                                <button id={"facture"} onClick={downloadFacture}>My facture</button>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>


                    {
                        services.length === 0 ? '' :

                            <div style={{marginLeft: '250px'}}>

                                <h2 style={{marginLeft: '0px'}}>Services included in the rental:</h2>
                                <div style={{marginLeft: '0'}} className={"services"}>

                                    <ul>
                                        {
                                            services.map((service, index) => {
                                                return (
                                                    <Card cardInfo={{
                                                        title: service.name,
                                                        description: '',
                                                        price: service.price
                                                    }}/>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                    }
                    {
                        isReserved ?
                            servicesSelected.length === 0 ?
                                <h2>No additional services</h2>
                                :
                                <h2>Your services add : </h2>
                            :
                            <h2>Choose additional services : </h2>
                    }
                    <div className={"services services-new"}
                         style={isReserved && servicesSelected.length === 0 ? {display: 'none'} : {}}>

                        {
                            !isReserved ?

                                servicesGlobal.map((service, index) => {
                                    if (!services.find((s) => s.id === service.id)) {
                                        return (
                                            <Card
                                                onclick={() => {
                                                    addService(index + cardToRemoveIndex, service.id);

                                                }}
                                                cardInfo={{
                                                    title: service.name,
                                                    description: '',
                                                    price: service.price
                                                }}/>
                                        );
                                    } else {
                                        cardToRemoveIndex -= 1;
                                    }
                                }) :
                                servicesSelected.map((service, index) => {
                                    return (

                                        <Card
                                            cardInfo={{
                                                title: service.name,
                                                description: '',
                                                price: service.price
                                            }}/>
                                    );
                                })
                        }
                    </div>


                    <div className={"calendar"}>
                    </div>
                    {
                        isReserved || isBail ?
                            (
                                <div className={"if-is-buy"}>
                                    {
                                        isBail ? '' :
                                            <div className={"notation"}>
                                                <h3>Notation</h3>
                                                <ul className={"stars"}>
                                                    {
                                                        [1, 2, 3, 4, 5].map((star, index) => {
                                                            return (
                                                                <li key={index} onClick={() => addNotation(star)}><i
                                                                    className="ai-star"></i></li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </div>

                                    }


                                    <div className={"container-message"}>
                                        <h3>Messages</h3>
                                        <div className={"messages"}>
                                            {
                                                messages.map((message, index) => {
                                                    return (
                                                        <div key={index} className={"message"}>
                                                            <p>{message.message}</p>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                        <input type={"text"} id={"message-input"}/>
                                        <i className={"ai-paper-airplane"} onClick={addMessage}></i>
                                    </div>
                                </div>
                            )
                            : ''

                    }
                </div>
            </div>
        );
    }
}