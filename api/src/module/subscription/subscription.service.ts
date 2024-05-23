import {BodySubscription, BodySubscriptionPrice} from "./subscription.model";
import {SubscriptionRepository} from "./subscription.repository";
import {Stripe} from 'stripe';
import {uid} from 'uid';

export class SubscriptionService {

    private SubscriptionRepository: SubscriptionRepository;

    constructor() {
        this.SubscriptionRepository = new SubscriptionRepository();
    }

    async getSubscriptions() {
        return await this.SubscriptionRepository.getSubscriptions();
    }

    async createSubscription(token: string) {
        return await this.SubscriptionRepository.createSubscription(token);
    }

    async updateSubscription(id: number, subscription: BodySubscription, token: string) {
        return await this.SubscriptionRepository.updateSubscription(id, subscription, token);
    }

    async deleteSubscription(id: number) {
        if (!(typeof id === "number")) {
            throw new Error('Bad id');
        } else
            return await this.SubscriptionRepository.deleteSubscription(id);
    }

    async userIsSubscribed(token: string) {
        return await this.SubscriptionRepository.userIsSubscribed(token);
    }


    async subscribeUserByToken(token: string, subscription: BodySubscription) {
        if (!(typeof subscription.price === "number")) {
            throw new Error('Bad price');
        } else {
            const uidToken = uid(30)
            await this.SubscriptionRepository.subscribeUserByToken(token, subscription.price, uidToken);
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Premium',
                            },
                            unit_amount: subscription.price * 100,
                            recurring: {interval: 'month'},
                        },
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `http://localhost:3001/subscription/subscribe-validation:${uidToken}`,
                cancel_url: `${process.env.FRONTEND_URL}/home`,
            });
            return {url: session.url};
        }
    }

    async subscribeUserValidation(token: string) {
        await this.SubscriptionRepository.valdationSubscription(token);
        return "User subscribed";
    }

    async unsubscribeUserByToken(token: string) {
        return await this.SubscriptionRepository.unsubscribeUserByToken(token);
    }

    async lastDateFreeService(token: string) {
        return await this.SubscriptionRepository.lastDateFreeService(token);

    }

    async subscriptionPrice() {
        return await this.SubscriptionRepository.subscriptionPrice();
    }

    async updateSubscriptionPrice(subscription: BodySubscriptionPrice) {
        return await this.SubscriptionRepository.updateSubscriptionPrice(subscription);
    }
}