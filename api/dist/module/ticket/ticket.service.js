"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const ticket_repository_1 = require("./ticket.repository");
class TicketService {
    constructor() {
        this.TicketRepository = new ticket_repository_1.TicketRepository();
    }
    async getTickets() {
        return await this.TicketRepository.getTickets();
    }
    createTicket(ticket) {
        return this.TicketRepository.createTicket(ticket);
    }
    updateTicket(id, ticket) {
        return this.TicketRepository.updateTicket(id, ticket);
    }
    deleteTicket(id) {
        return this.TicketRepository.deleteTicket(id);
    }
    createMessageTicket(id, message) {
        return this.TicketRepository.createMessageTicket(id, message);
    }
    async getMessageTickets(id) {
        return await this.TicketRepository.getMessageTickets(id);
    }
    updateMessageTicket(id, messageId, message) {
        return this.TicketRepository.updateMessageTicket(id, messageId, message);
    }
    deleteMessageTicket(id, messageId) {
        return this.TicketRepository.deleteMessageTicket(id, messageId);
    }
}
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map