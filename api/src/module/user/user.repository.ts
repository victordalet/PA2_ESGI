import {sha256} from "js-sha256";
import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {User} from "../../core/user";

export class UserRepository {

    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async createUser(userInformation: User) {
        await this.db.query("INSERT INTO USER(name, email, password, role , address, created_at, updated_at) " +
            "VALUES(?,?,?,?,?,?,?)", [userInformation.name,
            userInformation.email,
            sha256(userInformation.password),
            userInformation.role,
            userInformation.address,
            new Date(), new Date()]);
    }

    async getUser(): Promise<User[]> {
        const [rows, filed] = await this.db.query("SELECT email, name, password, rules, address, updated_at, created_at, deleted_at ,connection FROM USER");
        const [rows2, filed2] = await this.db.query("SELECT user_email FROM subscription");
        const userSubscription: string[] = []
        if (rows2 instanceof Array) {
            rows2.forEach((row: any) => {
                userSubscription.push(row.user_email);
            });
        }
        const users: User[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                users.push({
                    email: row.email,
                    name: row.name,
                    password: row.password,
                    role: row.rules,
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

    async createConnection(connection: string, email: string) {
        await this.db.query("UPDATE USER SET connection = ? WHERE email = ?", [connection, email]);
    }

    async deleteConnection(email: string) {
        await this.db.execute("UPDATE USER SET connection = ? WHERE email = ?", [null, email]);
    }

    async getUserByEmail(email: string): Promise<User> {
        const [row, field] = await this.db.query("SELECT email, name, password, rules, address, updated_at, created_at, deleted_at, connection FROM USER WHERE email = ?", [email]);
        return row[0];
    }

    async deleteUser(email: string) {
        await this.db.query("DELETE FROM USER WHERE email = ?", [email]);
    }

    async updateUser(userInformation: User) {
        await this.db.query("UPDATE USER SET name = ?, password = ?, rules = ?, address = ?, updated_at = ? WHERE email = ?",
            [userInformation.name,
                sha256(userInformation.password),
                userInformation.role,
                userInformation.address,
                new Date(),
                userInformation.email]);
    }

    async updatePassword(userInformation: User) {
        await this.db.query("UPDATE USER SET password = ?, updated_at = ? WHERE email = ?",
            [sha256(userInformation.password),
                new Date(),
                userInformation.email]);
    }

    async updateRole(userInformation: User) {
        await this.db.query("UPDATE USER SET rules = 'user_request_to_admin', updated_at = ? WHERE email = ?",
            [userInformation.role,
                new Date(),
                userInformation.email]);
    }

    async updateRoleAdmin(userInformation: User) {
        await this.db.query("UPDATE USER SET rules = ?, updated_at = ? WHERE email = ?",
            [userInformation.role,
                new Date(),
                userInformation.email]);
    }

    async isGoodPassword(email: string, password: string): Promise<boolean> {
        const [row, field] = await this.db.query("SELECT password FROM USER WHERE email = ?", [email]);
        return row[0]?.password === password;
    }

    async isGoodPasswordAdmin(email: string, password: string): Promise<boolean> {
        const [row, field] = await this.db.query("SELECT password FROM USER WHERE email = ? and rules = 'ADMIN'", [email]);
        return row[0]?.password === password;
    }

}