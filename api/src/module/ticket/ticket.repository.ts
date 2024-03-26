import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {MessageTicket, Ticket} from "../../core/ticket";

export class TicketRepository {
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

    async createTicket(ticket: Ticket, token: string) {
        const [rows, filed] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        return this.db.query("INSERT INTO TICKET (name, description,created_at ,updated_at,created_by,status) VALUES (?, ?, ?, ?, ?,'TODO')",
            [ticket.name, ticket.description, new Date(), new Date(), rows[0].email]);
    }

    updateTicket(id: number, ticket: Ticket) {
        return this.db.query("UPDATE TICKET SET title = ?, description = ? , updated_at = ? WHERE id = ?", [ticket.name, ticket.description, new Date(), id]);
    }

    async deleteTicket(id: number) {
        return this.db.query("DELETE FROM TICKET WHERE id = ?", [id]);
    }

    async createMessageTicket(id: number, message: MessageTicket) {
        return this.db.query("INSERT INTO TICKET_MESSAGE (ticket_id, message,created_at,updated_at,created_by) VALUES (?, ?, ?, ?, ?)",
            [id, message.message, new Date(), new Date(), message.created_by]);
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

    updateMessageTicket(id: number, messageId: number, message: MessageTicket) {
        return this.db.query("UPDATE TICKET_MESSAGE SET message = ? WHERE id = ?", [message.message, messageId]);
    }

    deleteMessageTicket(messageId: number) {
        return this.db.query("DELETE FROM TICKET_MESSAGE WHERE id = ?", [messageId]);
    }

    async updateTicketStatus(id: number, ticket: Ticket) {
        return this.db.query("UPDATE TICKET SET status = ? WHERE id = ?", [ticket.status, id]);
    }

    async updateOccupyTicket(id: number, ticket: Ticket) {
        return this.db.query("UPDATE TICKET SET occupy_by = ? WHERE id = ?", [ticket.occupy_by, id]);
    }


}