"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const subscription_repository_1 = require("./subscription.repository");
class SubscriptionService {
    constructor() {
        this.SubscriptionRepository = new subscription_repository_1.SubscriptionRepository();
    }
    async getSubscriptions() {
        return await this.SubscriptionRepository.getSubscriptions();
    }
    async createSubscription(subscription) {
        return await this.SubscriptionRepository.createSubscription(subscription);
    }
    async updateSubscription(id, subscription) {
        return await this.SubscriptionRepository.updateSubscription(id, subscription);
    }
    async deleteSubscription(id) {
        return await this.SubscriptionRepository.deleteSubscription(id);
    }
    async userIsSubscribed(email) {
        return await this.SubscriptionRepository.userIsSubscribed(email);
    }
    async subscribeUserByToken(token, subscription) {
        return await this.SubscriptionRepository.subscribeUserByToken(token, subscription.price);
    }
    async unsubscribeUserByToken(token) {
        return await this.SubscriptionRepository.unsubscribeUserByToken(token);
    }
}
exports.SubscriptionService = SubscriptionService;
//# sourceMappingURL=subscription.service.js.map