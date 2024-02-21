import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";

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
        const [rows, filed] = await this.db.query("SELECT * FROM MESSAGE");
        const messages: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                messages.push(row);
            });
        }
        return messages;
    }

    async createMessage(message: any) {
        return this.db.query("INSERT INTO MESSAGE (message, created_at ,updated_at, to_user, created_by) VALUES (?, ?, ?, ?, ?)", [message.message, new Date(), new Date(), message.to_user, message.created_by]);
    }

    async updateMessage(id: number, message: any) {
        return this.db.query("UPDATE MESSAGE SET message = ?, updated_at = ? WHERE id = ?", [message.message, new Date(), id]);
    }

    async deleteMessage(id: number) {
        return this.db.query("DELETE FROM MESSAGE WHERE id = ?", [id]);
    }

    async getMessagesByEmailFrom(email: string) {
        const [rows, filed] = await this.db.query("SELECT * FROM MESSAGE WHERE created_by = ?", [email]);
        const messages: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                messages.push(row);
            });
        }
        return messages;
    }

    async getMessagesByEmailTo(email: string) {
        const [rows, filed] = await this.db.query("SELECT * FROM MESSAGE WHERE to_user = ?", [email]);
        const messages: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                messages.push(row);
            });
        }
        return messages;
    }
}