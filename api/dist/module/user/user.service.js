"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const js_sha512_1 = require("js-sha512");
const uid_1 = require("uid");
const user_repository_1 = require("./user.repository");
class UserService {
    constructor() {
        this.UserRepository = new user_repository_1.UserRepository();
    }
    async CreateUser(userInformation) {
        const user = await this.GetUserByEmail(userInformation.email);
        if (user) {
            throw new Error("User already exists");
        }
        else {
            await this.UserRepository.createUser(userInformation);
        }
    }
    async GetUser() {
        return await this.UserRepository.getUser();
    }
    async createConnection(email, password) {
        if (await this.UserRepository.isGoodPassword(email, (0, js_sha512_1.sha512)(password))) {
            const connection = (0, uid_1.uid)(32);
            await this.UserRepository.createConnection(connection, email);
            return { connection: connection };
        }
        else {
            return { connection: null };
        }
    }
    async deleteConnection(email) {
        await this.UserRepository.deleteConnection(email);
    }
    async GetUserByEmail(email) {
        return await this.UserRepository.getUserByEmail(email);
    }
    async DeleteUser(email) {
        return await this.UserRepository.deleteUser(email);
    }
    async UpdateUser(userInformation) {
        return await this.UserRepository.updateUser(userInformation);
    }
    async updatePassword(userInformation, token) {
        userInformation.password = (0, js_sha512_1.sha512)(userInformation.password);
        userInformation.token = token;
        await this.UserRepository.updatePassword(userInformation);
    }
    async updateEmail(userInformation, token) {
        userInformation.token = token;
        return await this.UserRepository.updateEmail(userInformation);
    }
    async updateUsername(userInformation, token) {
        userInformation.token = token;
        return await this.UserRepository.updateUsername(userInformation);
    }
    async UpdateRole(userInformation) {
        return await this.UserRepository.updateRole(userInformation);
    }
    async UpdateRoleAdmin(userInformation) {
        const user = await this.GetUserByEmail(userInformation.email);
        if (user.rules !== "admin") {
            throw new Error("User is not admin");
        }
        await this.UserRepository.updateRoleAdmin(userInformation);
    }
    async createConnectionAdmin(email, password) {
        if (await this.UserRepository.isGoodPasswordAdmin(email, (0, js_sha512_1.sha512)(password))) {
            return await this.createConnection(email, password);
        }
        else {
            return { connection: null };
        }
    }
    async isAdmin() {
        return { connection: true };
    }
    async isUser() {
        return { connection: true };
    }
    async isBail() {
        return { connection: true };
    }
    async getStats() {
        const users = await this.GetUser();
        let date = new Date();
        const weekStats = [];
        for (let i = 0; i < 10; i++) {
            const userTest = users.filter(user => new Date(user.created_at) < new Date(date.toISOString()));
            date.setDate(date.getDate() - 1);
            weekStats.push(userTest.filter(user => new Date(user.created_at) > new Date(date.toISOString())).length);
        }
        weekStats.map((value, index) => {
            weekStats[index] = value / users.length * 100;
        });
        return {
            nb_users: users.length,
            nb_remove_user: users.filter(user => user.deleted_at).length,
            nb_premium: users.filter(user => user.premium).length,
            nb_users_created_this_week: weekStats
        };
    }
    async getEmailByToken(token) {
        const user = await this.UserRepository.getUserByToken(token);
        return { email: user.email };
    }
    async requestBail(token) {
        const user = await this.UserRepository.getUserByToken(token);
        if (user.rules !== ("user_request_to_bail" || "ADMIN")) {
            await this.UserRepository.updateRole(user);
        }
    }
    async getRequestBail() {
        const user = await this.UserRepository.getUser();
        return user.filter(user => user.rules === "user_request_to_bail");
    }
    async acceptRequestBail(email) {
        return await this.UserRepository.updateRoleBail(email);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map