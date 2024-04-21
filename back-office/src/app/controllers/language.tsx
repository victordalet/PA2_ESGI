import React, {Component} from "react";
import {observer} from "mobx-react";

import {ControllerProps} from "../@types/language";
import View from "../views/language";
import {haveToken} from "../../security/token";
import LanguageViewModel from "../view-models/language";
import {LanguageModel} from "../model/language";

@observer
export default class LanguageControllers extends Component<ControllerProps> {

    languageViewModel: LanguageViewModel;
    languageModel: LanguageModel;

    constructor(props: any, context: any) {
        super(props, context);
        this.languageViewModel = new LanguageViewModel();
        this.languageModel = new LanguageModel();
        haveToken();
    }


    render() {
        return <View
            postFile={this.languageModel.postFile}
            downloadCSVFIle={this.languageViewModel.downloadCSVFIle}/>;
    }
}
