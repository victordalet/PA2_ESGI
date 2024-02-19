import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {MessageTicket, Ticket} from "../../core/ticket";

export class TicketService {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getTickets() {
        const [rows, filed] = await this.db.query("SELECT * FROM TICKET");
        const tickets: Ticket[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                tickets.push(row);
            });
        }
        return tickets;
    }

    createTicket(ticket: Ticket) {
        return this.db.query("INSERT INTO TICKET (title, description,created_at ,updated_at,) VALUES (?, ?, ?, ?)", [ticket.name, ticket.description, new Date(), new Date()]);
    }

    updateTicket(id: number, ticket: Ticket) {
        return this.db.query("UPDATE TICKET SET title = ?, description = ? , updated_at = ? WHERE id = ?", [ticket.name, ticket.description, new Date(), id]);
    }

    deleteTicket(id: number) {
        return this.db.query("DELETE FROM TICKET WHERE id = ?", [id]);
    }

    createMessageTicket(id: number, message: any) {
        return this.db.query("INSERT INTO TICKET_MESSAGE (ticket_id, message) VALUES (?, ?)", [id, message.message]);
    }

    async getMessageTickets(id: number) {
        const [row, field] = await this.db.query("SELECT * FROM TICKET_MESSAGE WHERE ticket_id = ?", [id]);
        const messages: MessageTicket[] = [];
        if (row instanceof Array) {
            row.forEach((message: any) => {
                messages.push(message);
            });
        }
        return messages;
    }

    updateMessageTicket(id: number, messageId: number, message: any) {
        return this.db.query("UPDATE TICKET_MESSAGE SET message = ? WHERE id = ?", [message.message, messageId]);
    }

    deleteMessageTicket(id: number, messageId: number) {
        return this.db.query("DELETE FROM TICKET_MESSAGE WHERE id = ?", [messageId]);
    }
}