import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";

export class LanguageRepository {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }


    async getLanguage() {
        const [rows, filed] = await this.db.query("SELECT * FROM translation");
        return rows;
    }

    async addWord(word: string, translation: string, language: string) {
        return this.db.query("INSERT INTO translation (word, translation,language) VALUES (?, ?, ?)", [word, translation, language]);
    }


}