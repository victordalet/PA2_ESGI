import {LanguageRepository} from "./language.repository";
import {Language} from "../../core/langue";

export class LanguageService {

    private languageRepository: LanguageRepository;


    constructor() {
        this.languageRepository = new LanguageRepository();
    }

    async getLanguageFileByName() {
        return await this.languageRepository.getLanguage();
    }

    async postWord(languageParam: Language) {
        return await this.languageRepository.addWord(languageParam.words, languageParam.translation, languageParam.language);
    }

}