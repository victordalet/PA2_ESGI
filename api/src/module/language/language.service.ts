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
        if(!(typeof languageParam.words === 'string')){
            throw new Error('Bad word');
        }else if(!(typeof languageParam.translation === 'string')){
            throw new Error('Bad translation');
        }else if(!(typeof languageParam.language === 'string')){
            throw new Error('Bad language');
        }
        else
        return await this.languageRepository.addWord(languageParam.words, languageParam.translation, languageParam.language);
    }

}