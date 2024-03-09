"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mysql_entity_1 = require("../../database/mysql.entity");
const js_sha512_1 = require("js-sha512");
class UserRepository {
    constructor() {
        this.database = new mysql_entity_1.DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }
    async createUser(userInformation) {
        await this.db.query("INSERT INTO USER(name, email, password, rules , address, created_at, updated_at) " +
            "VALUES(?,?,?,?,?,?,?)", [userInformation.name,
            userInformation.email,
            (0, js_sha512_1.sha512)(userInformation.password),
            userInformation.rules || "user",
            userInformation.address,
            new Date(), new Date()]);
    }
    async getUser() {
        const [rows, filed] = await this.db.query("SELECT email, name, password, rules, address, updated_at, created_at, deleted_at ,connection FROM USER");
        const [rows2, filed2] = await this.db.query("SELECT user_email FROM subscription");
        const userSubscription = [];
        if (rows2 instanceof Array) {
            rows2.forEach((row) => {
                userSubscription.push(row.user_email);
            });
        }
        const users = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                users.push({
                    email: row.email,
                    name: row.name,
                    password: row.password,
                    rules: row.rules,
                    address: row.address,
                    updated_at: row.updated_at,
                    created_at: row.created_at,
                    deleted_at: row.deleted_at,
                    token: row.connection,
                    premium: userSubscription.includes(row.email)
                });
            });
        }
        return users;
    }
    async createConnection(connection, email) {
        await this.db.query("UPDATE USER SET connection = ? WHERE email = ?", [connection, email]);
    }
    async deleteConnection(email) {
        await this.db.execute("UPDATE USER SET connection = ? WHERE email = ?", [null, email]);
    }
    async getUserByEmail(email) {
        const [row, field] = await this.db.query("SELECT email, name, password, rules, address, updated_at, created_at, deleted_at, connection FROM USER WHERE email = ?", [email]);
        return row[0];
    }
    async getUserByToken(token) {
        const [row, field] = await this.db.query("SELECT * FROM USER WHERE connection = ?", [token]);
        return row[0];
    }
    async deleteUser(email) {
        await this.db.query("DELETE FROM USER WHERE email = ?", [email]);
    }
    async updateUser(userInformation) {
        await this.db.query("UPDATE USER SET name = ?, password = ?, rules = ?, address = ?, updated_at = ? WHERE email = ?", [userInformation.name,
            (0, js_sha512_1.sha512)(userInformation.password),
            userInformation.rules,
            userInformation.address,
            new Date(),
            userInformation.email]);
    }
    async updateRole(userInformation) {
        await this.db.query("UPDATE USER SET rules = 'user_request_to_bail', updated_at = ? WHERE email = ?", [new Date(), userInformation.email]);
    }
    async updateRoleBail(email) {
        await this.db.query("UPDATE USER SET rules = 'BAIL', updated_at = ? WHERE email = ?", [new Date(), email]);
    }
    async updateRoleAdmin(userInformation) {
        await this.db.query("UPDATE USER SET rules = ?, updated_at = ? WHERE email = ?", [userInformation.rules,
            new Date(),
            userInformation.email]);
    }
    async isGoodPassword(email, password) {
        var _a;
        const [row, field] = await this.db.query("SELECT password FROM USER WHERE email = ?", [email]);
        return ((_a = row[0]) === null || _a === void 0 ? void 0 : _a.password) === password;
    }
    async isGoodPasswordAdmin(email, password) {
        var _a;
        const [row, field] = await this.db.query("SELECT password FROM USER WHERE email = ? and rules = 'ADMIN'", [email]);
        return ((_a = row[0]) === null || _a === void 0 ? void 0 : _a.password) === password;
    }
    async updateEmail(userInformation) {
        await this.db.query("UPDATE USER SET email = ?, updated_at = ? WHERE connection = ?", [userInformation.email,
            new Date(),
            userInformation.token]);
    }
    async updateUsername(userInformation) {
        await this.db.query("UPDATE USER SET name = ?, updated_at = ? WHERE connection = ?", [userInformation.name,
            new Date(),
            userInformation.token]);
    }
    async updatePassword(userInformation) {
        await this.db.query("UPDATE USER SET password = ?, updated_at = ? WHERE connection = ?", [(0, js_sha512_1.sha512)(userInformation.password),
            new Date(),
            userInformation.token]);
    }
    async requestBail(email) {
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map