import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";

export class JobRepository {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getJob() {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM job");
        return rows;
    }

    async addJob(name: string) {
        await this.db.connect()
        return this.db.query("INSERT INTO job (name) VALUES (?)", [name]);
    }

}