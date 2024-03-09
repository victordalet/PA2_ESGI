"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const message_repository_1 = require("./message.repository");
class MessageService {
    constructor() {
        this.MessageRepository = new message_repository_1.MessageRepository();
    }
    async getMessages() {
        return await this.MessageRepository.getMessages();
    }
    async getMessagesByEmailFrom(email) {
        return await this.MessageRepository.getMessagesByEmailFrom(email);
    }
    async getMessagesByEmailTo(email) {
        return await this.MessageRepository.getMessagesByEmailTo(email);
    }
    async createMessage(message) {
        return await this.MessageRepository.createMessage(message);
    }
    async updateMessage(id, message) {
        return await this.MessageRepository.updateMessage(id, message);
    }
    async deleteMessage(id) {
        return await this.MessageRepository.deleteMessage(id);
    }
    async getIllegibleMessages() {
        const messages = await this.MessageRepository.getMessages();
        const illegibleWords = await this.MessageRepository.getIllegibleWords();
        return messages.map((message) => {
            const words = message.message.split(' ');
            let nbIllegibleWords = 0;
            words.forEach((word) => {
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
    async addIllegibleWord(word) {
        return await this.MessageRepository.addIllegibleWord(word);
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map