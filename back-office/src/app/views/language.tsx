import {ViewProps} from '../@types/language';
import React from "react";
import {Navbar} from "../../components/navbar";
import {Table} from "../../components/table";


export default class LanguageView extends React.Component <ViewProps> {


    render() {

        const {postFile} = this.props;

        return (
            <div>
                <Navbar/>
                <div className={"container-language"}>
                    <div className={"form"}>
                        <input type={"text"} id={"language"} placeholder={"Enter the language"}/>
                        <input type={"text"} id={"word"} placeholder={"Enter the word to translate"}/>
                        <input type={"text"} id={"translation"} placeholder={"Enter the translation"}/>
                        <button onClick={postFile}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}