import { User } from "../../core/user";
export declare class UserRepository {
    private db;
    private database;
    constructor();
    createUser(userInformation: User): Promise<void>;
    getUser(): Promise<User[]>;
    createConnection(connection: string, email: string): Promise<void>;
    deleteConnection(email: string): Promise<void>;
    getUserByEmail(email: string): Promise<User>;
    getUserByToken(token: string): Promise<User>;
    deleteUser(email: string): Promise<void>;
    updateUser(userInformation: User): Promise<void>;
    updateRole(userInformation: User): Promise<void>;
    updateRoleBail(email: string): Promise<void>;
    updateRoleAdmin(userInformation: User): Promise<void>;
    isGoodPassword(email: string, password: string): Promise<boolean>;
    isGoodPasswordAdmin(email: string, password: string): Promise<boolean>;
    updateEmail(userInformation: User): Promise<void>;
    updateUsername(userInformation: User): Promise<void>;
    updatePassword(userInformation: User): Promise<void>;
    requestBail(email: string): Promise<void>;
}
