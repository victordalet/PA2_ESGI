import {BodySubscription} from "./subscription.model";
import {SubscriptionRepository} from "./subscription.repository";
import stripe, {Stripe} from 'stripe';

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
        else {
          const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
          const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items: [
                  {
                      price_data: {
                          currency: 'usd',
                          product_data: {
                              name: 'Premium',
                          },
                          unit_amount: subscription.price,
                      },
                      quantity: 1,
                  },
              ],
              mode: 'payment',
              success_url: `${process.env.FRONTEND_URL}/premium`,
              cancel_url: `${process.env.FRONTEND_URL}/home`,
          });

          await this.SubscriptionRepository.subscribeUserByToken(token, subscription.price);
          return session.url;
        }
    }

    async unsubscribeUserByToken(token: string) {
        return await this.SubscriptionRepository.unsubscribeUserByToken(token);
    }

    async lastDateFreeService(token: string) {
        return await this.SubscriptionRepository.lastDateFreeService(token);

    }
}