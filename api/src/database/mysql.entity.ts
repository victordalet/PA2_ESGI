import * as mysql from "mysql2/promise";
import {Connection} from "mysql2/promise";

export class DatabaseEntity {
    public db: Connection;
    private static instance: DatabaseEntity;

    constructor() {
        this.getConnection().then(r => console.log(r));
    }

    async getConnection() {
        this.db = await mysql.createConnection({
            connectionLimit: 100,
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

    }

}