"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRepository = void 0;
const mysql_entity_1 = require("../../database/mysql.entity");
class TicketRepository {
    constructor() {
        this.database = new mysql_entity_1.DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }
    async getTickets() {
        const [rows, filed] = await this.db.query("SELECT * FROM TICKET");
        const tickets = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                tickets.push(row);
            });
        }
        return tickets;
    }
    createTicket(ticket) {
        return this.db.query("INSERT INTO TICKET (title, description,created_at ,updated_at,) VALUES (?, ?, ?, ?)", [ticket.name, ticket.description, new Date(), new Date()]);
    }
    updateTicket(id, ticket) {
        return this.db.query("UPDATE TICKET SET title = ?, description = ? , updated_at = ? WHERE id = ?", [ticket.name, ticket.description, new Date(), id]);
    }
    deleteTicket(id) {
        return this.db.query("DELETE FROM TICKET WHERE id = ?", [id]);
    }
    createMessageTicket(id, message) {
        return this.db.query("INSERT INTO TICKET_MESSAGE (ticket_id, message) VALUES (?, ?)", [id, message.message]);
    }
    async getMessageTickets(id) {
        const [row, field] = await this.db.query("SELECT * FROM TICKET_MESSAGE WHERE ticket_id = ?", [id]);
        const messages = [];
        if (row instanceof Array) {
            row.forEach((message) => {
                messages.push(message);
            });
        }
        return messages;
    }
    updateMessageTicket(id, messageId, message) {
        return this.db.query("UPDATE TICKET_MESSAGE SET message = ? WHERE id = ?", [message.message, messageId]);
    }
    deleteMessageTicket(id, messageId) {
        return this.db.query("DELETE FROM TICKET_MESSAGE WHERE id = ?", [messageId]);
    }
}
exports.TicketRepository = TicketRepository;
//# sourceMappingURL=ticket.repository.js.map