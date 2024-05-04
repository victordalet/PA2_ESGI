import React from "react";

export interface LanguageResponse {
    language: string;
    word: string;
    translation: string;
}


export class Language extends React.Component {

    constructor(props: any) {
        super(props);
        this.fetchLanguage();
        if (document.cookie.includes('Language=')) {
            const option = document.cookie.split("Language=")[1].split(" : ")[0];
            this.translation(option);
        }
    }

    private async fetchLanguage() {
        const apiPath = process.env.API_PATH || "http://localhost:3001";
        const response = await fetch(apiPath + "/language");
        const language: LanguageResponse[] = await response.json();
        const array_element: string[] = [];
        language.forEach((language: LanguageResponse) => {
            const option = document.createElement("option");
            if (!array_element.includes(language.language)) {
                array_element.push(language.language);
                option.value = language.language;
                option.textContent = language.language;
                const select = document.querySelector<HTMLSelectElement>(".select-translation");
                select?.appendChild(option);
            }
        });
    }

    private async translation(option: string = document.querySelector<HTMLSelectElement>(".select-translation")?.value || '') {
        const apiPath = process.env.API_PATH || "http://localhost:3001";
        const response = await fetch(apiPath + "/language");
        const language: LanguageResponse[] = await response.json();
        if (option === "en" && document.cookie.split("Language=")[1].split(" : ")[0] != 'en') {
            document.location.reload();
        }
        const words: string[] = [];
        document.querySelectorAll("h1,h2,h3,h4").forEach((element) => {
            if (element.textContent) {
                words.push(element.textContent);
            }
        });
        const optionElement = document.querySelector<HTMLSelectElement>('.select-translation');
        if (optionElement) {
            optionElement.value = option;
        }
        words.forEach((word) => {
            language.forEach((l: LanguageResponse) => {
                if (l.language === option) {
                    if (word.includes(l.word)) {
                        const translation = word.replace(l.word, l.translation);
                        document.querySelectorAll("h1,h2,h3,h4").forEach((element) => {
                            if (element.textContent) {
                                if (element.textContent.includes(word)) {
                                    element.textContent = element.textContent.replace(word, translation);
                                }
                            }
                        });
                    }
                }
            });
        });

        const date = new Date();
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        const expired = "expires= " + date.toUTCString();
        document.cookie = "Language=" + option + " : " + expired + ";path=/";
    }


    render() {
        return (
            <select className={"select-translation"} onChange={() => this.translation()}>
                <option value={'en'}>English</option>
            </select>
        );
    }
}