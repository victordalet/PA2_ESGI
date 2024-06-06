import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {User} from "../../core/user";
import {BodySubscription, BodySubscriptionPrice} from "./subscription.model";

export class SubscriptionRepository {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getSubscriptions() {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM subscription");
        const subscriptions: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                subscriptions.push(row);
            });
        }
        return subscriptions;
    }

    async createSubscription(token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        if (rows)
            return this.db.query("INSERT INTO subscription (email, created_at ,updated_at) VALUES (?, ?, ?)", [rows[0].email, new Date(), new Date()]);
    }

    async updateSubscription(id: number, subscription: any, token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        if (rows)
            return this.db.query("UPDATE subscription SET email = ?, updated_at = ? WHERE id = ?", [rows[0].email, new Date(), id]);
    }

    async deleteSubscription(id: number) {
        await this.db.connect()
        return this.db.query("DELETE FROM subscription WHERE id = ?", [id]);
    }

    async userIsSubscribed(token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        if (rows instanceof Array) {
            const row: any = rows[0];
            const [rows2, filed2] = await this.db.query("SELECT * FROM subscription WHERE user_email = ? and (is_pay = '' or is_pay is null) ", [row.email]);
            return rows2;
        }
    }

    async subscribeUserByToken(token: string, price: number, uid: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        if (rows instanceof Array) {
            const row: any = rows[0];
            const [rows2, filed2] = await this.db.query("SELECT * FROM subscription WHERE user_email = ?", [row.email]);
            if (rows2 instanceof Array) {
                if (rows2.length > 0) {
                    await this.db.query("DELETE FROM subscription WHERE user_email = ?", [row.email]);
                }
            }
            return this.db.query("INSERT INTO subscription (user_email, created_at, price, is_pay) VALUES (?, ?, ?, ?)", [row.email, new Date(), price, uid]);
        }

    }

    async unsubscribeUserByToken(token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        if (rows instanceof Array) {
            const row: any = rows[0];
            const [rows2, filed2] = await this.db.query("SELECT * FROM subscription WHERE user_email = ?", [row.email]);
            if (rows2 instanceof Array) {
                if (rows2.length > 0) {
                    return this.db.query("UPDATE subscription SET deleted_at = ? WHERE user_email = ?", [new Date(), row.email]);
                }
            }
        }
    }

    async validationSubscription(token: string) {
        await this.db.connect()
        await this.db.query("UPDATE subscription set is_pay = '' where is_pay = ?", [token.replace(":", "")])
        return
    }

    async lastDateFreeService(token: string) {
        const [rows, filed] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        if (rows instanceof Array) {
            const row: any = rows[0]
            const [rows2, filed2] = await this.db.query("SELECT * FROM subscription_utilisation WHERE email = ?", [row.email]);
            return rows2;
        }
    }

    async subscriptionPrice() {
        await this.db.connect();
        const [rows, filed] = await this.db.query("SELECT * FROM price_sub");
        return rows;
    }

    async updateSubscriptionPrice(body: BodySubscriptionPrice) {
        await this.db.connect();
        return this.db.query("UPDATE price_sub SET price = ? WHERE name = ?", [body.price, body.name]);
    }

    async updateSubscriptionRules(body: BodySubscriptionPrice) {
        await this.db.connect();
        return this.db.query("UPDATE price_sub SET free = ?, reduce = ? WHERE name = ?", [body.free, body.reduce, body.name]);
    }

}