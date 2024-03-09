import { GetEmailUser, UserBody } from "./user.model";
export declare class UserController {
    private userService;
    private tokenValidation;
    constructor();
    getUser(token: string): Promise<import("../../core/user").User[]>;
    getUserByEmail(token: string, params: GetEmailUser): Promise<import("../../core/user").User>;
    getStats(token: string): Promise<import("../../core/user").StatsUser>;
    createConnection(body: UserBody): Promise<{
        connection: string;
    }>;
    createConnectionAdmin(body: UserBody): Promise<{
        connection: string;
    }>;
    isBail(token: string): Promise<{
        connection: boolean;
    }>;
    isAdmin(token: string): Promise<{
        connection: boolean;
    }>;
    isUser(token: string): Promise<{
        connection: boolean;
    }>;
    createUser(body: UserBody): Promise<void>;
    requestBail(token: string): Promise<void>;
    getRequestBail(token: string): Promise<import("../../core/user").User[]>;
    acceptRequestBail(token: string, body: UserBody): Promise<void>;
    tokenToMail(token: string): Promise<{
        email: string;
    }>;
    updateUser(token: string, body: UserBody): Promise<void>;
    deleteUser(token: string, params: GetEmailUser): Promise<void>;
    deleteConnection(token: string, params: GetEmailUser): Promise<void>;
    updateEmail(token: string, body: UserBody): Promise<void>;
    updateUsername(token: string, body: UserBody): Promise<void>;
    updatePassword(token: string, body: UserBody): Promise<void>;
    updateRole(token: string, body: UserBody): Promise<void>;
    updateRoleAdmin(token: string, body: UserBody): Promise<void>;
}
