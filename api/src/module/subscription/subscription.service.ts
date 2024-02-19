import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {BodySubscription} from "./subscription.model";

export class SubscriptionService {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getSubscriptions() {
        const [rows, filed] = await this.db.query("SELECT * FROM SUBSCRIPTION");
        const subscriptions: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                subscriptions.push(row);
            });
        }
        return subscriptions;
    }

    createSubscription(subscription: BodySubscription) {
        return this.db.query("INSERT INTO SUBSCRIPTION (email, created_at ,updated_at) VALUES (?, ?, ?)", [subscription.email, new Date(), new Date()]);
    }

    updateSubscription(id: number, subscription: BodySubscription) {
        return this.db.query("UPDATE SUBSCRIPTION SET email = ?, updated_at = ? WHERE id = ?", [subscription.email, new Date(), id]);
    }

    deleteSubscription(id: number) {
        return this.db.query("DELETE FROM SUBSCRIPTION WHERE id = ?", [id]);
    }

    async userIsSubscribed(email: string): Promise<boolean> {
        const [rows, filed] = await this.db.query("SELECT * FROM SUBSCRIPTION WHERE email = ?", [email]);
        if (rows instanceof Array) {
            return Promise.resolve(rows.length > 0);
        }
        return false
    }
}