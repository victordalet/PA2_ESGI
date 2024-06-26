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
        if (!(typeof ticket.name === 'string')) {
            throw new Error('Bad name');
        } else if (!(typeof ticket.description === 'string' && ticket.description.length > 10)) {
            throw new Error('Bad description');
        } else
            return await this.TicketRepository.createTicket(ticket, token);
    }

    updateTicket(id: number, ticket: Ticket) {
        if (!(typeof ticket.name === 'string')) {
            throw new Error('Bad name');
        } else if (!(typeof ticket.description === 'string' && ticket.description.length > 10)) {
            throw new Error('Bad description');
        } else
            return this.TicketRepository.updateTicket(id, ticket);
    }

    async deleteTicket(id: number) {
        return this.TicketRepository.deleteTicket(id);
    }

    async createMessageTicket(id: number, message: any) {
        if (!(typeof message.message === 'string')) {
            throw new Error('Bad message');
        } else if (!(typeof message.created_by === 'string')) {
            throw new Error('Error');
        } else
            return await this.TicketRepository.createMessageTicket(id, message);
    }

    async getMessageTickets(id: number) {
        return await this.TicketRepository.getMessageTickets(id);
    }

    async updateMessageTicket(id: number, messageId: number, message: any) {
        if (!(typeof message.message === 'string')) {
            throw new Error('Bad message');
        } else if (!(typeof messageId === 'number')) {
            throw new Error('Bad messageId');
        } else
            return this.TicketRepository.updateMessageTicket(id, messageId, message);
    }

    async deleteMessageTicket(id: number, messageId: number) {
        if (!(typeof messageId === 'number')) {
            throw new Error('Bad messageId');
        } else
            return this.TicketRepository.deleteMessageTicket(messageId);
    }

    async updateTicketStatus(id: number, ticket: Ticket) {
        if (!(typeof ticket.status === 'string')) {
            throw new Error('Bad status');
        } else
            return await this.TicketRepository.updateTicketStatus(id, ticket);
    }

    async updateTicketCat(id: number, ticket: Ticket) {
        if (!(typeof ticket.status === 'string')) {
            throw new Error('Bad status');
        } else
            return await this.TicketRepository.updateTicketCat(id, ticket);
    }

    async updateOccupyTicket(id: number, ticket: Ticket) {
        if (!(typeof ticket.occupy_by === 'string')) {
            throw new Error('Error');
        } else
            return await this.TicketRepository.updateOccupyTicket(id, ticket);
    }
}