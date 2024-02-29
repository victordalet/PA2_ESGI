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

    async getIllegibleMessages() {
        const messages = await this.MessageRepository.getMessages();
        const illegibleWords = await this.MessageRepository.getIllegibleWords();
        return messages.map((message: UserMessage) => {
            const words = message.message.split(' ');
            let nbIllegibleWords = 0;
            words.forEach((word: string) => {
                if (illegibleWords.includes(word)) {
                    nbIllegibleWords++;
                }
            });
            return {
                created_by: message.created_by,
                nb_illegible_words: nbIllegibleWords
            };
        });

    }

    async addIllegibleWord(word: string) {
        return await this.MessageRepository.addIllegibleWord(word);
    }
}