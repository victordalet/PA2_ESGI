import React, { Component } from "react";
import { observer } from "mobx-react";

import { ControllerProps } from "../@types/language";
import View from "../views/language";
import { haveToken } from "../../security/token";

@observer
export default class LanguageControllers extends Component<ControllerProps> {
  constructor(props: any, context: any) {
    super(props, context);
    haveToken();
  }

  postFile = async () => {
    const apiPath = process.env.API_HOST || "http://localhost:3001";
    const language =
      document.querySelector<HTMLInputElement>("#language")?.value;
    const word = document.querySelector<HTMLInputElement>("#word")?.value;
    const translation =
      document.querySelector<HTMLInputElement>("#translation")?.value;

    await fetch(apiPath + "/language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token") || "",
      },
      body: JSON.stringify({
        language: language,
        words: word,
        translation: translation,
      }),
    });
    document.querySelector<HTMLInputElement>("#language")!.value = "";
    document.querySelector<HTMLInputElement>("#word")!.value = "";
    document.querySelector<HTMLInputElement>("#translation")!.value = "";
  };

  render() {
    return <View postFile={this.postFile} />;
  }
}
