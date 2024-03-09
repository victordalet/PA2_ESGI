import { StatsUser, User } from "../../core/user";
export declare class UserService {
    private UserRepository;
    constructor();
    CreateUser(userInformation: User): Promise<void>;
    GetUser(): Promise<User[]>;
    createConnection(email: string, password: string): Promise<{
        connection: string;
    }>;
    deleteConnection(email: string): Promise<void>;
    GetUserByEmail(email: string): Promise<User>;
    DeleteUser(email: string): Promise<void>;
    UpdateUser(userInformation: User): Promise<void>;
    updatePassword(userInformation: User, token: string): Promise<void>;
    updateEmail(userInformation: User, token: string): Promise<void>;
    updateUsername(userInformation: User, token: string): Promise<void>;
    UpdateRole(userInformation: User): Promise<void>;
    UpdateRoleAdmin(userInformation: User): Promise<void>;
    createConnectionAdmin(email: string, password: string): Promise<{
        connection: string;
    }>;
    isAdmin(): Promise<{
        connection: boolean;
    }>;
    isUser(): Promise<{
        connection: boolean;
    }>;
    isBail(): Promise<{
        connection: boolean;
    }>;
    getStats(): Promise<StatsUser>;
    getEmailByToken(token: string): Promise<{
        email: string;
    }>;
    requestBail(token: string): Promise<void>;
    getRequestBail(): Promise<User[]>;
    acceptRequestBail(email: string): Promise<void>;
}
