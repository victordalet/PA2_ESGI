import {MessageTicket, Ticket} from "../../core/ticket";
import {TicketRepository} from "./ticket.repository";

export class TicketService {

    private TicketRepository: TicketRepository;

    constructor() {
        this.TicketRepository = new TicketRepository();
    }

    async getTickets() {
        return await this.TicketRepository.getTickets();
    }

    async createTicket(ticket: Ticket, token: string) {
        return await this.TicketRepository.createTicket(ticket, token);
    }

    updateTicket(id: number, ticket: Ticket) {
        return this.TicketRepository.updateTicket(id, ticket);
    }

    deleteTicket(id: number) {
        return this.TicketRepository.deleteTicket(id);
    }

    createMessageTicket(id: number, message: any) {
        return this.TicketRepository.createMessageTicket(id, message);
    }

    async getMessageTickets(id: number) {
        return await this.TicketRepository.getMessageTickets(id);
    }

    updateMessageTicket(id: number, messageId: number, message: any) {
        return this.TicketRepository.updateMessageTicket(id, messageId, message);
    }

    deleteMessageTicket(id: number, messageId: number) {
        return this.TicketRepository.deleteMessageTicket(id, messageId);
    }
}