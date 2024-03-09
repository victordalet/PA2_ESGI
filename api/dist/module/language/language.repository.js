"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageRepository = void 0;
const mysql_entity_1 = require("../../database/mysql.entity");
class LanguageRepository {
    constructor() {
        this.database = new mysql_entity_1.DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }
    async getLanguage() {
        const [rows, filed] = await this.db.query("SELECT * FROM translation");
        return rows;
    }
    async addWord(word, translation, language) {
        return this.db.query("INSERT INTO translation (word, translation,language) VALUES (?, ?, ?)", [word, translation, language]);
    }
}
exports.LanguageRepository = LanguageRepository;
//# sourceMappingURL=language.repository.js.map