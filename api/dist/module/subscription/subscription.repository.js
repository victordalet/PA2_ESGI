"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRepository = void 0;
const mysql_entity_1 = require("../../database/mysql.entity");
class SubscriptionRepository {
    constructor() {
        this.database = new mysql_entity_1.DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }
    async getSubscriptions() {
        const [rows, filed] = await this.db.query("SELECT * FROM subscription");
        const subscriptions = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                subscriptions.push(row);
            });
        }
        return subscriptions;
    }
    async createSubscription(subscription) {
        return this.db.query("INSERT INTO subscription (email, created_at ,updated_at) VALUES (?, ?, ?)", [subscription.email, new Date(), new Date()]);
    }
    async updateSubscription(id, subscription) {
        return this.db.query("UPDATE subscription SET email = ?, updated_at = ? WHERE id = ?", [subscription.email, new Date(), id]);
    }
    async deleteSubscription(id) {
        return this.db.query("DELETE FROM subscription WHERE id = ?", [id]);
    }
    async userIsSubscribed(email) {
        const [rows, filed] = await this.db.query("SELECT * FROM subscription WHERE email = ?", [email]);
        if (rows instanceof Array) {
            return Promise.resolve(rows.length > 0);
        }
        return false;
    }
    async subscribeUserByToken(token, price) {
        const [rows, filed] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        if (rows instanceof Array) {
            const row = rows[0];
            const [rows2, filed2] = await this.db.query("SELECT * FROM subscription WHERE user_email = ?", [row.email]);
            if (rows2 instanceof Array) {
                if (rows2.length > 0) {
                    await this.db.query("DELETE FROM subscription WHERE user_email = ?", [row.email]);
                }
            }
            return this.db.query("INSERT INTO subscription (user_email, created_at, price) VALUES (?, ?, ?)", [row.email, new Date(), price]);
        }
    }
    async unsubscribeUserByToken(token) {
        const [rows, filed] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        if (rows instanceof Array) {
            const row = rows[0];
            const [rows2, filed2] = await this.db.query("SELECT * FROM subscription WHERE user_email = ?", [row.email]);
            if (rows2 instanceof Array) {
                if (rows2.length > 0) {
                    return this.db.query("UPDATE subscription SET deleted_at = ? WHERE user_email = ?", [new Date(), row.email]);
                }
            }
        }
    }
}
exports.SubscriptionRepository = SubscriptionRepository;
//# sourceMappingURL=subscription.repository.js.map