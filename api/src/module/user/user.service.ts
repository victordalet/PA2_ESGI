import {DatabaseEntity} from "../../database/mysql.entity";
import {Connection} from "mysql2/promise";
import {User} from "../../core/user";
import {sha256} from 'js-sha256';
import {uid} from 'uid';

export class UserService {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async CreateUser(userInformation: User) {
        const user = await this.GetUserByEmail(userInformation.email);
        if (user) {
            throw new Error("User already exists");
        } else {
            await this.db.query("INSERT INTO USER(name, email, password, role , address, created_at, updated_at) " +
                "VALUES(?,?,?,?,?,?,?)", [userInformation.name,
                userInformation.email,
                sha256(userInformation.password),
                userInformation.role,
                userInformation.address,
                new Date(), new Date()]);
        }
    }

    async GetUser(): Promise<User[]> {
        const [rows, filed] = await this.db.query("SELECT email, name, password, role, address, updated_at, created_at, deleted_at, connection FROM USER");
        const users: User[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                users.push({
                    email: row.email,
                    name: row.name,
                    password: row.password,
                    role: row.role,
                    address: row.address,
                    updated_at: row.updated_at,
                    created_at: row.created_at,
                    deleted_at: row.deleted_at,
                    token: row.connection
                });
            });
        }
        return users;
    }

    async createConnection(email: string, password: string) {
        const user = await this.GetUserByEmail(email);
        if (user.password === sha256(password)) {
            const connection = uid(32);
            await this.db.query("UPDATE USER SET connection = ? WHERE email = ?", [connection, email]);
            return {connection: connection};
        } else {
            return {connection: null};
        }
    }

    async deleteConnection(email: string) {
        await this.db.execute("UPDATE USER SET connection = ? WHERE email = ?", [null, email]);
    }

    async verifyConnection(token: string) {
        const [row, field] = await this.db.query("SELECT email, name, password, role, address, updated_at, created_at, deleted_at, connection FROM USER WHERE connection = ?", [token]);
        return row[0];
    }

    async GetUserByEmail(email: string): Promise<User> {
        const [row, field] = await this.db.query("SELECT email, name, password, role, address, updated_at, created_at, deleted_at, connection FROM USER WHERE email = ?", [email]);
        return row[0];
    }

    async DeleteUser(email: string) {
        await this.db.query("DELETE FROM USER WHERE email = ?", [email]);
    }

    async UpdateUser(userInformation: User) {
        await this.db.query("UPDATE USER SET name = ?, password = ?, role = ?, address = ?, updated_at = ? WHERE email = ?",
            [userInformation.name,
                sha256(userInformation.password),
                userInformation.role,
                userInformation.address,
                new Date(),
                userInformation.email]);
    }

    async UpdatePassword(userInformation: User) {
        const user = await this.GetUserByEmail(userInformation.email);
        if (user.password !== sha256(userInformation.password)) {
            throw new Error("Old password is incorrect");
        }
        await this.db.query("UPDATE USER SET password = ?, updated_at = ? WHERE email = ?",
            [sha256(userInformation.password),
                new Date(),
                userInformation.email]);
    }

    async UpdateRole(userInformation: User) {
        const user = await this.GetUserByEmail(userInformation.email);
        if (user.token !== userInformation.token) {
            throw new Error("Connection is incorrect");
        }
        await this.db.query("UPDATE USER SET role = 'user_request_to_admin', updated_at = ? WHERE email = ?",
            [userInformation.role,
                new Date(),
                userInformation.email]);
    }

    async UpdateRoleAdmin(userInformation: User) {
        const user = await this.GetUserByEmail(userInformation.email);
        if (user.role !== "admin") {
            throw new Error("User is not admin");
        }
        await this.db.query("UPDATE USER SET role = ?, updated_at = ? WHERE email = ?",
            [userInformation.role,
                new Date(),
                userInformation.email]);
    }


    async isFoundToken(token: string): Promise<boolean> {
        const [row, field] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        if (Array.isArray(row)) {
            return !!row[0];
        }
        return false;
    }
}