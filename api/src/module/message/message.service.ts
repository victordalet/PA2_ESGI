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
         if(!(typeof message.message === 'string')){
            throw new Error('Bad message');}
         else if(!(typeof message.to_user === 'string')){
            throw new Error('Bad translation');
        }else if(!(typeof message.created_by === 'string')){
            throw new Error('Bad language');
        }
        else
        return await this.MessageRepository.createMessage(message);
    }

    async updateMessage(id: number, message: BodyMessage) {
        if(!(typeof id === 'number')){
            throw new Error('Bad id');}
        else if(!(typeof message === 'string')){
            throw new Error('Bad message');}
        
        else
        return await this.MessageRepository.updateMessage(id, message);
    }

    async deleteMessage(id: number) {
        if(!(typeof id === 'number')){
            throw new Error('Bad id');}
        else
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
         if(!(typeof word === 'string')){
            throw new Error('Bad word');}
        
        else
        return await this.MessageRepository.addIllegibleWord(word);
    }
}