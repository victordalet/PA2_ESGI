import {StatsUser, User} from "../../core/user";
import {sha512} from 'js-sha512';
import {uid} from 'uid';
import {UserRepository} from "./user.repository";

export class UserService {

    private UserRepository: UserRepository;

    constructor() {
        this.UserRepository = new UserRepository();
    }

    async CreateUser(userInformation: User) {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!(reg.test(userInformation.email))) {
            throw new Error('Bad email');
        } else if (!(typeof userInformation.name === 'string')) {
            throw new Error('Bad name');
        } else if (!(typeof userInformation.password === 'string' && userInformation.password.length > 8)) {
            throw new Error('Bad password');
        } else if (!(typeof userInformation.address === 'string')) {
            throw new Error('Bad address');
        } else {
            const user = await this.GetUserByEmail(userInformation.email);
            if (user) {
                throw new Error("User already exists");
            } else {
                await this.UserRepository.createUser(userInformation);
            }
        }
    }

    async GetUser(): Promise<User[]> {
        return await this.UserRepository.getUser();
    }

    async createConnection(email: string, password: string) {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!(reg.test(email))) {
            throw new Error('Bad email');
        } else if (!(typeof password === 'string' && password.length > 8)) {
            throw new Error('Bad password');
        } else {
            if (await this.UserRepository.isGoodPassword(email, sha512(password))) {
                const connection = uid(32);
                await this.UserRepository.createConnection(connection, email);
                return {connection: connection};
            } else {
                return {connection: null};
            }
        }
    }

    async deleteConnection(email: string) {
        await this.UserRepository.deleteConnection(email);
    }

    async GetUserByEmail(email: string): Promise<User> {
        return await this.UserRepository.getUserByEmail(email);
    }

    async DeleteUser(email: string) {
        return await this.UserRepository.deleteUser(email);
    }

    async UpdateUser(userInformation: User) {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!(reg.test(userInformation.email))) {
            throw new Error('Bad email');
        } else if (!(typeof userInformation.name === 'string')) {
            throw new Error('Bad name');
        } else if (!(typeof userInformation.password === 'string' && userInformation.password.length > 8)) {
            throw new Error('Bad password');
        } else if (!(typeof userInformation.address === 'string')) {
            throw new Error('Bad address');
        } else
            return await this.UserRepository.updateUser(userInformation);
    }

    async updatePassword(userInformation: User, token: string) {
        if (!(typeof userInformation.password === 'string' && userInformation.password.length > 8)) {
            throw new Error('Bad password');
        } else
            userInformation.password = sha512(userInformation.password);
        userInformation.token = token;
        await this.UserRepository.updatePassword(userInformation);
    }

    async updateEmail(userInformation: User, token: string) {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!(reg.test(userInformation.email))) {
            throw new Error('Bad email');
        } else {
            userInformation.token = token;
            return await this.UserRepository.updateEmail(userInformation);
        }
    }

    async updateUsername(userInformation: User, token: string) {
        if (!(typeof userInformation.name === 'string')) {
            throw new Error('Bad name');
        } else {
            userInformation.token = token;
            return await this.UserRepository.updateUsername(userInformation);
        }
    }

    async addAdmin(email: string) {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!(reg.test(email))) {
            throw new Error('Bad email');
        } else {
            const user = await this.GetUserByEmail(email);
            if (user.rules === "ADMIN") {
                user.rules = "USER";
            } else {
                user.rules = "ADMIN";
            }
            return await this.UserRepository.updateRoleAdmin(user);
        }
    }


    async UpdateRoleAdmin(userInformation: User) {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!(reg.test(userInformation.email))) {
            throw new Error('Bad email');
        } else {
            const user = await this.GetUserByEmail(userInformation.email);
            if (user.rules !== "admin") {
                throw new Error("User is not admin");
            }
            await this.UserRepository.updateRoleAdmin(userInformation);
        }
    }

    async createConnectionAdmin(email: string, password: string) {
        if (await this.UserRepository.isGoodPasswordAdmin(email, sha512(password))) {
            return await this.createConnection(email, password);
        } else {
            return {connection: null};
        }

    }

    async isAdmin() {
        return {connection: true};
    }

    async isUser() {
        return {connection: true};
    }

    async isBail() {
        return {connection: true};
    }

    async isPrestataire() {
        return {connection: true};
    }

    async getStats(): Promise<StatsUser> {
        const users = await this.GetUser();
        let date = new Date();
        const weekStats = [];
        for (let i = 0; i < 10; i++) {
            const userTest = users.filter(user => new Date(user.created_at) < new Date(date.toISOString()))
            date.setDate(date.getDate() - 1);
            weekStats.push(userTest.filter(user => new Date(user.created_at) > new Date(date.toISOString())).length);
        }
        weekStats.map((value, index) => {
            weekStats[index] = value / users.length * 100;
        })
        const getStats = await this.UserRepository.getStats();
        return {
            nb_users: users.length,
            nb_remove_user: users.filter(user => user.deleted_at).length,
            nb_premium: users.filter(user => user.premium).length,
            nb_users_created_this_week: weekStats,
            nb_services: getStats[0].nb_services,
            nb_location: getStats[0].nb_location,
            number_job: getStats[0].number_job,
            number_location_type: getStats[0].number_location_type
        }

    }

    async getEmailByToken(token: string) {
        const user = await this.UserRepository.getUserByToken(token);
        return {email: user.email};
    }

    async requestBail(token: string, rule: string) {
        const user = await this.UserRepository.getUserByToken(token);
        if (user.rules !== ("ADMIN")) {
            await this.UserRepository.updateRole(user, rule);
        }
    }

    async getRequestBail() {
        const user = await this.UserRepository.getUser();
        return user.filter(user => user.rules.includes("request"));
    }

    async acceptRequestBail(email: string) {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!(reg.test(email))) {
            throw new Error('Bad email');
        } else
            return await this.UserRepository.updateRoleBail(email);
    }

    async deleteUserByAdmin(email: string) {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!(reg.test(email))) {
            throw new Error('Bad email');
        } else
            return await this.UserRepository.deleteUser(email);
    }


    async deleteAccount(token: string) {
        this.UserRepository.deleteAccount(token);
    }

}