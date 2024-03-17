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
        return await this.SubscriptionRepository.createSubscription(subscription);
    }

    async updateSubscription(id: number, subscription: BodySubscription) {
        return await this.SubscriptionRepository.updateSubscription(id, subscription);
    }

    async deleteSubscription(id: number) {
        return await this.SubscriptionRepository.deleteSubscription(id);
    }

    async userIsSubscribed(token: string) {
        return await this.SubscriptionRepository.userIsSubscribed(token);
    }


    async subscribeUserByToken(token: string, subscription: BodySubscription) {
        return await this.SubscriptionRepository.subscribeUserByToken(token, subscription.price);
    }

    async unsubscribeUserByToken(token: string) {
        return await this.SubscriptionRepository.unsubscribeUserByToken(token);
    }

    async lastDateFreeService(token: string) {
        return await this.SubscriptionRepository.lastDateFreeService(token);

    }
}