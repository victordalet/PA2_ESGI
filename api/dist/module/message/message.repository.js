"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const mysql_entity_1 = require("../../database/mysql.entity");
class MessageRepository {
    constructor() {
        this.database = new mysql_entity_1.DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }
    async getMessages() {
        const [rows, filed] = await this.db.query("SELECT * FROM message");
        const messages = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                messages.push(row);
            });
        }
        return messages;
    }
    async createMessage(message) {
        return this.db.query("INSERT INTO message (message, created_at ,updated_at, to_user, created_by) VALUES (?, ?, ?, ?, ?)", [message.message, new Date(), new Date(), message.to_user, message.created_by]);
    }
    async updateMessage(id, message) {
        return this.db.query("UPDATE message SET message = ?, updated_at = ? WHERE id = ?", [message.message, new Date(), id]);
    }
    async deleteMessage(id) {
        return this.db.query("DELETE FROM MESSAGE WHERE id = ?", [id]);
    }
    async getMessagesByEmailFrom(email) {
        const [rows, filed] = await this.db.query("SELECT * FROM message WHERE created_by = ?", [email]);
        const messages = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                messages.push(row);
            });
        }
        return messages;
    }
    async getMessagesByEmailTo(email) {
        const [rows, filed] = await this.db.query("SELECT * FROM message WHERE to_user = ?", [email]);
        const messages = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                messages.push(row);
            });
        }
        return messages;
    }
    async getIllegibleWords() {
        const [rows, filed] = await this.db.query("SELECT word FROM bad_world");
        const words = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                words.push(row.word);
            });
        }
        return words;
    }
    async addIllegibleWord(word) {
        return this.db.query("INSERT INTO bad_world (word) VALUES (?)", [word]);
    }
}
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=message.repository.js.map