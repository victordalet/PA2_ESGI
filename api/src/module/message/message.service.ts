import {UserMessage} from "../../core/user";
import {BodyMessage} from "./message.model";
import {MessageRepository} from "./message.repository";

export class MessageService {

    private MessageRepository: MessageRepository;

    constructor() {
        this.MessageRepository = new MessageRepository();
    }

    async getMessages() {
        return await this.MessageRepository.getMessages();
    }

    async getMessagesByEmailFrom(email: string) {
        return await this.MessageRepository.getMessagesByEmailFrom(email);
    }

    async getMessagesByEmailTo(email: string) {
        return await this.MessageRepository.getMessagesByEmailTo(email);
    }

    async createMessage(message: BodyMessage) {
        return await this.MessageRepository.createMessage(message);
    }

    async updateMessage(id: number, message: BodyMessage) {
        return await this.MessageRepository.updateMessage(id, message);
    }

    async deleteMessage(id: number) {
        return await this.MessageRepository.deleteMessage(id);
    }
}