import React from "react";
import {Navbar} from "../../components/navbar";
import {Language} from "../../components/language";
import {ViewProps} from "../@types/location";
import {Card} from "../../components/card";

export default class LocationView extends React.Component <ViewProps> {
    render() {

        const {
            resetChoiceConcierge,
            allSelectedRadioContact,
            storeFormInJSON,
            service,
            activeStep2
        } = this.props;

        return (
            <div className="location-page">
                <Navbar/>
                <Language/>
                <div className={"form"}>
                    <h1>Je fais une demande de simulation personnalisée</h1>
                    <div className={"step"}>
                        <h2>Quel type de conciergie souhaitez-vous? <span className={"req"}>(Nécessaire)</span></h2>
                        <div className={"choice"}>
                            <div className={"step"}>
                                <input type="radio" onChange={() => resetChoiceConcierge(1)} id="conciergerie1"
                                       name="gestion1" value="Gestion de A à Z"/>
                                <label htmlFor="conciergerie1">Gestion de A à Z</label>
                            </div>
                            <div className={"step"}>
                                <input type="radio" onChange={() => resetChoiceConcierge(2)} id="conciergerie2"
                                       name="gestion2"
                                       value="Yield Management (création, fiffusion et optimisation de vos revenus)"/>
                                <label htmlFor="conciergerie2">Yield Management (création, fiffusion et optimisation de
                                    vos
                                    revenus)</label>
                            </div>
                            <div className={"step"}>
                                <input type="radio" onChange={() => resetChoiceConcierge(3)} id="conciergerie3"
                                       name="gestion3" value="Autre"/>
                                <label htmlFor="conciergerie3">Autre</label>
                            </div>
                        </div>
                    </div>
                    <div className={"bar"}></div>
                    <div className={"step"}>
                        <h2>Adresse de votre propriété en location courte durée
                            <span className={"req"}>(Nécessaire)</span>
                        </h2>
                        <input type={"text"} id={"address"} name={"address"} placeholder={"Adresse"}/>
                    </div>
                    <div className={"bar"}></div>
                    <div className={"step"}>
                        <h2>Pays de votre propriété en location courte durée
                            <span className={"req"}>(Nécessaire)</span>
                        </h2>
                        <select name="country" id="country">
                            <option value="france">France</option>
                            <option value="espagne">Espagne</option>
                            <option value="italie">Italie</option>
                            <option value="portugal">Portugal</option>
                            <option value="autre">Autre</option>
                        </select>
                        <div className={"bar"}></div>
                        <div className={"step2"}>
                            <div className={"step"}>
                                <h2>Type de bien
                                    <span className={"req"}>(Nécessaire)</span>
                                </h2>
                                <select name="type" id="type">
                                    <option value="appartement">Appartement</option>
                                    <option value="maison">Maison</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>
                            <div className={"step"}>
                                <h2>Type de location <span className={"req"}>(Nécessaire)</span></h2>
                                <select name="rent" id="rent">
                                    <option value="entier">Logement complet</option>
                                    <option value="chambre">Chambre</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>
                        </div>
                        <div className={"step"}>
                            <h2>Nombre de chambres <span className={"req"}>(Nécessaire)</span></h2>
                            <select name="room" id="room">
                                {
                                    Array.from(Array(10).keys()).map((i) => {
                                        return <option value={i}>{i}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className={"step"}>
                            <h2>Surface en m2 <span className={"req"}>(Nécessaire)</span></h2>
                            <input type={"number"} id={"surface"} name={"surface"} placeholder={"Surface"}/>
                        </div>
                        <div className={"bar"}></div>
                        <div className={"step"}>
                            <h2>Nom & prénom <span className={"req"}>(Nécessaire)</span></h2>
                            <input type={"text"} id={"name"} name={"name"} placeholder={"Nom & prénom"}/>
                        </div>
                        <div className={"bar"}></div>
                        <div className={"step2"}>
                            <div className={"step"}>
                                <h2>Email <span className={"req"}>(Nécessaire)</span></h2>
                                <input type={"email"} id={"email"} name={"email"} placeholder={"Email"}/>
                            </div>
                            <div className={"step"}>
                                <h2>Téléphone <span className={"req"}>(Nécessaire)</span></h2>
                                <input type={"tel"} id={"phone"} name={"phone"} placeholder={"Téléphone"}/>
                            </div>
                        </div>
                        <div className={"step"}>
                            <h2>À quelle heure souhaitez-vous être contacté? <span className={"req"}>(Nécessaire)</span>
                            </h2>
                            <div className={"choice"}>
                                <div className={"step"}>
                                    <input type={'radio'} id={'contact1'}
                                           name={'contact1'} value={'Avant 12h00'}/>
                                    <label htmlFor={'contact1'}>Avant 12h00</label>
                                </div>
                                <div className={"step"}>
                                    <input type={'radio'} id={'contact2'}
                                           name={'contact2'}
                                           value={'Entre 12h00 et 14h00'}/>
                                    <label htmlFor={'contact2'}>Entre 12h00 et 14h00</label>
                                </div>
                                <div className={"step"}>
                                    <input type={'radio'} id={'contact3'}
                                           name={'contact3'}
                                           value={'Entre 14h00 et 18h00'}/>
                                    <label htmlFor={'contact3'}>Entre 14h00 et 18h00</label>
                                </div>
                                <div className={"step"}>
                                    <input type={'radio'} id={'contact4'}
                                           name={'contact4'} value={'Après 18h00'}/>
                                    <label htmlFor={'contact4'}>Après 18h00</label>
                                </div>
                            </div>

                            <button id={"all"} onClick={allSelectedRadioContact}>ALL</button>
                        </div>
                        <div className={"captcha"}></div>
                        <div className={"step"}>
                            <h2>Pour soumettre ce forumlaire, vous devez accepter notre Déclaration de
                                confidentialité <span
                                    className={"req"}>(Nécessaire)</span></h2>
                            <input type={'checkbox'} id={'privacy'} name={'privacy'} value={'privacy'}/>
                            <a href={"#"}>Déclaration de confidentialité</a>
                        </div>

                        <div className={"step"}>
                            <button onClick={activeStep2} className={"submit"}>Recevoir mon étude de rentabilité
                            </button>
                        </div>

                    </div>

                </div>
                <div className={"container-price-and-creation"}>
                    <div className={"container-price"}>
                        <h2>Estimated price : </h2>
                        <input type={"number"} id={"price"} name={"price"} defaultValue={"0"}/>
                    </div>
                    <h2>Ajouter des services à ma locaition</h2>
                    <div className={"service"}>
                        {
                            service.map((s) => {
                                return <Card cardInfo={{
                                    title: s.name,
                                    description: s.description,
                                    price: s.price,
                                    location: s.duration.toString()
                                }}/>;
                            })

                        }
                    </div>
                    <button onClick={storeFormInJSON} className={"submit"}>Créer ma location</button>
                </div>
            </div>
        )
            ;
    }
}