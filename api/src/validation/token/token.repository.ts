import {DatabaseEntity} from "../../database/mysql.entity";
import {Connection} from "mysql2/promise";

export class TokenRepository {

    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async isFoundToken(token: string): Promise<boolean> {
        const [row, field] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        return Array.isArray(row) && row.length > 0;

    }

    async isAdminToken(token: string): Promise<boolean> {
        const [row, field] = await this.db.query("SELECT rules FROM USER WHERE connection = ?", [token]);
        return row[0]?.rules === 'ADMIN';
    }

    async isBailToken(token: string): Promise<boolean> {
        const [row, field] = await this.db.query("SELECT rules FROM USER WHERE connection = ?", [token]);
        return row[0]?.rules === 'BAIL';
    }

    async iSPrestataireToken(token: string): Promise<boolean> {
        const [row, field] = await this.db.query("SELECT rules FROM USER WHERE connection = ?", [token]);
        return row[0]?.rules === 'PRESTATAIRE';
    }

}