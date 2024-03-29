import React from "react";
import {Navbar} from "../../components/navbar";
import {Language} from "../../components/language";
import {ViewProps} from "../@types/location";
import {Card} from "../../components/card";
import {PopupError} from "../../components/popup";
import ReCAPTCHA from "react-google-recaptcha";

export default class LocationView extends React.Component <ViewProps> {
    render() {

        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };

        const {
            resetChoiceConcierge,
            allSelectedRadioContact,
            storeFormInJSON,
            service,
            activeStep2,
            addServiceToForm,
            validationCaptcha,
            getPredictYolo
        } = this.props;

        return (
            <div className="location-page">
                <Navbar/>
                <Language/>
                <PopupError text={"All fields are required"}/>
                <div className={"form"}>
                    <h1>I request a personalized simulation .</h1>
                    <div className={"step"}>
                        <h2>What type of concierge do you want? <span className={"req"}>(Necessary)</span></h2>
                        <div className={"choice"}>
                            <div className={"step"}>
                                <input type="radio" onChange={() => resetChoiceConcierge(1)} id="conciergerie1"
                                       name="gestion1" value="Gestion de A à Z"/>
                                <label htmlFor="conciergerie1">Management from A to Z</label>
                            </div>
                            <div className={"step"}>
                                <input type="radio" onChange={() => resetChoiceConcierge(2)} id="conciergerie2"
                                       name="gestion2"
                                       value="Yield Management (création, fiffusion et optimisation de vos revenus)"/>
                                <label htmlFor="conciergerie2">Yield Management (creation, distribution and optimization
                                    of
                                    your income)</label>
                            </div>
                            <div className={"step"}>
                                <input type="radio" onChange={() => resetChoiceConcierge(3)} id="conciergerie3"
                                       name="gestion3" value="Autre"/>
                                <label htmlFor="conciergerie3">Other</label>
                            </div>
                        </div>
                    </div>
                    <div className={"bar"}></div>
                    <div className={"step"}>
                        <h2>Address of your short-term rental property
                            <span className={"req"}>(Necessary)</span>
                        </h2>
                        <input type={"text"} id={"address"} name={"address"} placeholder={"Adresse"}/>
                    </div>
                    <div className={"bar"}></div>
                    <div className={"step"}>
                        <h2>Country of your short-term rental property
                            <span className={"req"}>(Necessary)</span>
                        </h2>
                        <select name="country" id="country">
                            <option value="france">France</option>
                            <option value="espagne">Espagne</option>
                            <option value="italie">Italie</option>
                            <option value="portugal">Portugal</option>
                            <option value="autre">Other</option>
                        </select>
                        <div className={"bar"}></div>
                        <div className={"step2"}>
                            <div className={"step"}>
                                <h2>Type de bien
                                    <span className={"req"}>(Necessary)</span>
                                </h2>
                                <select name="type" id="type">
                                    <option value="appartement">Apartment</option>
                                    <option value="maison">House</option>
                                    <option value="autre">Other</option>
                                </select>
                            </div>
                            <div className={"step"}>
                                <h2>Type of rental <span className={"req"}>(Necessary)</span></h2>
                                <select name="rent" id="rent">
                                    <option value="entier">Complete accommodation</option>
                                    <option value="chambre">Room</option>
                                    <option value="autre">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className={"step"}>
                            <h2>Number of rooms <span className={"req"}>(Necessary)</span></h2>
                            <select name="room" id="room">
                                {
                                    Array.from(Array(10).keys()).map((i) => {
                                        return <option value={i}>{i}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className={"step"}>
                            <h2>Area in m2 <span className={"req"}>(Necessary)</span></h2>
                            <input type={"number"} id={"surface"} name={"surface"} placeholder={"Surface"}/>
                        </div>
                        <div className={"bar"}></div>
                        <div className={"step"}>
                            <h2>Last name First Name <span className={"req"}>(Necessary)</span></h2>
                            <input type={"text"} id={"name"} name={"name"} placeholder={"Nom & prénom"}/>
                        </div>
                        <div className={"bar"}></div>
                        <div className={"step2"}>
                            <div className={"step"}>
                                <h2>Email <span className={"req"}>(Necessary)</span></h2>
                                <input type={"email"} id={"email"} name={"email"} placeholder={"Email"}/>
                            </div>
                            <div className={"step"}>
                                <h2>Tel <span className={"req"}>(Necessary)</span></h2>
                                <input type={"tel"} id={"phone"} name={"phone"} placeholder={"Téléphone"}/>
                            </div>
                        </div>
                        <div className={"step"}>
                            <h2>What time would you like to be contacted? <span className={"req"}>(Necessary)</span>
                            </h2>
                            <div className={"choice"}>
                                <div className={"step"}>
                                    <input type={'radio'} id={'contact1'}
                                           name={'contact1'} value={'Avant 12h00'}/>
                                    <label htmlFor={'contact1'}>Between 12h00</label>
                                </div>
                                <div className={"step"}>
                                    <input type={'radio'} id={'contact2'}
                                           name={'contact2'}
                                           value={'Entre 12h00 et 14h00'}/>
                                    <label htmlFor={'contact2'}>Between 12h00 and 14h00</label>
                                </div>
                                <div className={"step"}>
                                    <input type={'radio'} id={'contact3'}
                                           name={'contact3'}
                                           value={'Entre 14h00 et 18h00'}/>
                                    <label htmlFor={'contact3'}>Between 14h00 and 18h00</label>
                                </div>
                                <div className={"step"}>
                                    <input type={'radio'} id={'contact4'}
                                           name={'contact4'} value={'Après 18h00'}/>
                                    <label htmlFor={'contact4'}>After 18h00</label>
                                </div>
                            </div>

                            <button id={"all"} onClick={allSelectedRadioContact}>ALL</button>
                        </div>
                        <div className={"captcha"}></div>
                        <div className={"step"}>
                            <h2>To submit this form you must accept your Privacy Statement<span
                                className={"req"}>(Necessary)</span></h2>
                            <input type={'checkbox'} id={'privacy'} name={'privacy'} value={'privacy'}/>
                            <a href={"#"}>Confidentiality declaration</a>
                        </div>

                        <ReCAPTCHA
                            sitekey="6LfIvZspAAAAAFzFfvk2JWywUKLZGf2VJhCnGOmz"
                            onChange={validationCaptcha}
                        />,
                        <div className={"step"}>
                            <button onClick={activeStep2} className={"submit"}>Receive my profitability study
                            </button>
                        </div>

                    </div>

                </div>
                <div className={"container-price-and-creation"}>
                    <h2>Estimation of the rental bonus price using AI: </h2>
                    <div className={"container-yolo"}>
                        <div className={"container-yolo-image-result"}>
                            <h2 id={"price-estimate-by-yolo"}>Estimation bonus Price ...</h2>
                        </div>
                        <input type={"file"} id={"image-file-to-yolo"} name={"image"} placeholder={"Image"}/>
                        <button onClick={getPredictYolo} style={{marginTop: '-5vh'}} className={"submit"}>Estimate the
                            Bonus prize
                        </button>
                    </div>
                    <div className={"container-price"}>
                        <h2>Estimated price : </h2>
                        <input type={"number"} id={"price"} name={"price"} defaultValue={"0"}/>
                    </div>
                    <h2>Add rental services : </h2>
                    <div className={"service"}>
                        {
                            service.map((s, i) => {
                                return <Card
                                    onclick={() => {
                                        addServiceToForm({
                                            name: s.name,
                                            price: s.price,
                                            id: s.id,
                                        }, i);
                                    }}
                                    cardInfo={{
                                        title: s.name,
                                        description: '',
                                        price: s.price,
                                        location: s.duration.toString(),
                                        type: 'service',
                                        id: s.id
                                    }}></Card>;
                            })

                        }
                    </div>
                    <div className={"container-picture-file"}>
                        <h2>Picture of the location</h2>
                        <input type={"file"} id={"image"} name={"image"} placeholder={"Image"}/>
                    </div>
                    <button onClick={storeFormInJSON} className={"submit"}>Create my rental</button>
                </div>
            </div>
        )
            ;
    }
}