import React from "react";
import {ViewProps} from "../@types/element";
import {Navbar} from "../../components/navbar";

export class ElementView extends React.Component<ViewProps> {

    render() {

        const {
            postElement,
            updatePrice,
            postJob
        } = this.props;

        return (
            <div>
                <Navbar/>
                <h1 style={{textAlign: 'center', marginTop: '100px'}}>Configure ELEMENTS</h1>
                <div className={"container-elements"}>
                    <div className={"container-elements-job"}>
                        <h2>Add job</h2>
                        <input type="text" id={"job-name"} placeholder="Job name"/>
                        <input type={"file"} id={"picture-input-job"} placeholder={"Upload image"}/>
                        <button onClick={postJob}>Add</button>
                    </div>
                    <div className={"container-elements-job"}>
                        <h2>Add Location Elements</h2>
                        <input type="text" id={"element-name"} placeholder="Elements name"/>
                        <input type={"file"} id={"picture-input-element"} placeholder={"Upload image"}/>
                        <button onClick={postElement}>Add</button>
                    </div>
                </div>

                <div className={"container-elements"}>

                    <div className={"container-elements-job"}>
                        <h2>Update price bag subscription</h2>
                        <input type="number" id={"price-bag"} placeholder="New price"/>
                        <button onClick={() => updatePrice('bag')}>Update</button>
                    </div>

                    <div className={"container-elements-job"}>
                        <h2>Update price explo subscription</h2>
                        <input type="number" id={"price-explo"} placeholder="New Price"/>
                        <button onClick={() => updatePrice('explo')}>Update</button>
                    </div>


                </div>
            </div>
        );
    }
}