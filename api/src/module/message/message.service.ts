import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {UserMessage} from "../../core/user";
import {BodyMessage} from "./message.model";

export class MessageService {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getMessages() {
        const [rows, filed] = await this.db.query("SELECT * FROM MESSAGE");
        const messages: UserMessage[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                messages.push(row);
            });
        }
        return messages;
    }

    async getMessagesByEmailFrom(email: string) {
        const [rows, filed] = await this.db.query("SELECT * FROM MESSAGE WHERE created_by = ?", [email]);
        const messages: UserMessage[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                messages.push(row);
            });
        }
        return messages;
    }

    async getMessagesByEmailTo(email: string) {
        const [rows, filed] = await this.db.query("SELECT * FROM MESSAGE WHERE to_user = ?", [email]);
        const messages: UserMessage[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                messages.push(row);
            });
        }
        return messages;
    }

    createMessage(message: BodyMessage) {
        return this.db.query("INSERT INTO MESSAGE (message, created_at ,updated_at, to_user, created_by) VALUES (?, ?, ?)", [message.message, new Date(), new Date(), message.created_at, message.deleted_at]);
    }

    updateMessage(id: number, message: BodyMessage) {
        return this.db.query("UPDATE MESSAGE SET message = ?, updated_at = ? WHERE id = ?", [message.message, new Date(), id]);
    }

    deleteMessage(id: number) {
        return this.db.query("DELETE FROM MESSAGE WHERE id = ?", [id]);
    }
}