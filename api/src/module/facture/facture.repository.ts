import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";

export class FactureRepository {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }


    async getFactures() {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM FACTURE");
        const factures: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                factures.push(row);
            });
        }
        return factures;
    }

    async createFacture(facture: any) {
        await this.db.connect()
        return this.db.query("INSERT INTO FACTURE (created_by, name, description, price, duration, type, notification, notification_interval, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [facture.created_by, facture.name, facture.description, facture.price, facture.duration, facture.type, facture.notification, facture.notification_interval, new Date(), new Date()]);
    }

    async updateFacture(id: number, facture: any) {
        return this.db.query("UPDATE FACTURE SET created_by = ?, name = ?, description = ?, price = ?, duration = ?, type = ?, notification = ?, notification_interval = ?, updated_at = ? WHERE id = ?", [facture.created_by, facture.name, facture.description, facture.price, facture.duration, facture.type, facture.notification, facture.notification_interval, new Date(), id]);
    }

    async deleteFacture(id: number) {
        await this.db.connect()
        return this.db.query("DELETE FROM FACTURE WHERE id = ?", [id])
    }
}