"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageService = void 0;
const language_repository_1 = require("./language.repository");
class LanguageService {
    constructor() {
        this.languageRepository = new language_repository_1.LanguageRepository();
    }
    async getLanguageFileByName() {
        return await this.languageRepository.getLanguage();
    }
    async postWord(languageParam) {
        return await this.languageRepository.addWord(languageParam.words, languageParam.translation, languageParam.language);
    }
}
exports.LanguageService = LanguageService;
//# sourceMappingURL=language.service.js.map