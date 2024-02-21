import {User} from "../../core/user";
import {sha256} from 'js-sha256';
import {uid} from 'uid';
import {UserRepository} from "./user.repository";

export class UserService {

    private UserRepository: UserRepository;

    constructor() {
        this.UserRepository = new UserRepository();
    }

    async CreateUser(userInformation: User) {
        const user = await this.GetUserByEmail(userInformation.email);
        if (user) {
            throw new Error("User already exists");
        } else {
            await this.UserRepository.createUser(userInformation);
        }
    }

    async GetUser(): Promise<User[]> {
        return await this.UserRepository.getUser();
    }

    async createConnection(email: string, password: string) {
        const user = await this.GetUserByEmail(email);
        if (user.password === sha256(password)) {
            const connection = uid(32);
            await this.UserRepository.createConnection(connection, email);
            return {connection: connection};
        } else {
            return {connection: null};
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
        return await this.UserRepository.updateUser(userInformation);
    }

    async UpdatePassword(userInformation: User) {
        const user = await this.GetUserByEmail(userInformation.email);
        if (user.password !== sha256(userInformation.password)) {
            throw new Error("Old password is incorrect");
        }
        await this.UserRepository.updatePassword(userInformation);
    }

    async UpdateRole(userInformation: User) {
        const user = await this.GetUserByEmail(userInformation.email);
        if (user.token !== userInformation.token) {
            throw new Error("Connection is incorrect");
        }
        await this.UserRepository.updateRole(userInformation);
    }

    async UpdateRoleAdmin(userInformation: User) {
        const user = await this.GetUserByEmail(userInformation.email);
        if (user.role !== "admin") {
            throw new Error("User is not admin");
        }
        await this.UserRepository.updateRoleAdmin(userInformation);
    }

}