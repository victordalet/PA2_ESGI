import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {LocationMessage} from "../../core/message";
import { BodyMessage } from "./message.model";

export class MessageRepository {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getMessages() {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM message");
        const messages: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                messages.push(row);
            });
        }
        return messages;
    }

    async createMessage(message:BodyMessage ) {
        await this.db.connect()
        return this.db.query("INSERT INTO message (message, created_at ,updated_at, to_user, created_by) VALUES (?, ?, ?, ?, ?)", [message.message, new Date(), new Date(), message.to_user, message.created_by]);
    }

    async updateMessage(id: number, message: any) {
        await this.db.connect()
        return this.db.query("UPDATE message SET message = ?, updated_at = ? WHERE id = ?", [message.message, new Date(), id]);
    }

    async deleteMessage(id: number) {
        await this.db.connect()
        return this.db.query("DELETE FROM MESSAGE WHERE id = ?", [id]);
    }

    async getMessagesByEmailFrom(email: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM message WHERE created_by = ?", [email]);
        const messages: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                messages.push(row);
            });
        }
        return messages;
    }

    async getMessagesByEmailTo(email: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM message WHERE to_user = ?", [email]);
        const messages: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                messages.push(row);
            });
        }
        return messages;
    }

    async getIllegibleWords() {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT word FROM bad_world");
        const words: string[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                words.push(row.word);
            });
        }
        return words;
    }

    async addIllegibleWord(word: string) {
        await this.db.connect()
        return this.db.query("INSERT INTO bad_world (word) VALUES (?)", [word]);
    }
}