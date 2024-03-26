import {BodySubscription} from "./subscription.model";
import {SubscriptionRepository} from "./subscription.repository";

export class SubscriptionService {

    private SubscriptionRepository: SubscriptionRepository;

    constructor() {
        this.SubscriptionRepository = new SubscriptionRepository();
    }

    async getSubscriptions() {
        return await this.SubscriptionRepository.getSubscriptions();
    }

    async createSubscription(subscription: BodySubscription) {
        if (!(typeof subscription.email === "string" && subscription.email.length > 4)) {
            throw new Error('Bad email');
        }
        else 
            return await this.SubscriptionRepository.createSubscription(subscription);
    }

    async updateSubscription(id: number, subscription: BodySubscription) {
        if (!(typeof subscription.email === "string" && subscription.email.length > 4)) {
            throw new Error('Bad email');
        }
        else if(!(typeof id === "number")){
            throw new Error('Bad id');
        }
        else
        return await this.SubscriptionRepository.updateSubscription(id, subscription);
    }

    async deleteSubscription(id: number) {
        if(!(typeof id === "number")){
            throw new Error('Bad id');
        }
        else
        return await this.SubscriptionRepository.deleteSubscription(id);
    }

    async userIsSubscribed(token: string) {
        return await this.SubscriptionRepository.userIsSubscribed(token);
    }


    async subscribeUserByToken(token: string, subscription: BodySubscription) {
        if(!(typeof subscription.price === "number")){
            throw new Error('Bad price');
        }
        else
        return await this.SubscriptionRepository.subscribeUserByToken(token, subscription.price);
    }

    async unsubscribeUserByToken(token: string) {
        return await this.SubscriptionRepository.unsubscribeUserByToken(token);
    }

    async lastDateFreeService(token: string) {
        return await this.SubscriptionRepository.lastDateFreeService(token);

    }
}