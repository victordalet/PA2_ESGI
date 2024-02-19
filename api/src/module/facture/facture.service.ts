import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {Facture} from "../../core/facture";
import {FactureModel} from "./facture.model";

export class FactureService {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getFactures() {
        const [rows, filed] = await this.db.query("SELECT * FROM facture");
        const factures: Facture[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                factures.push(row);
            });
        }
        return factures;
    }


    async createFacture(facture: FactureModel) {
        return await this.db.query("INSERT INTO facture (created_by, name, description, price, duration, type, notification, notification_interval, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [facture.created_by, facture.name, facture.description, facture.price, facture.duration, facture.type, facture.notification, facture.notification_interval, new Date(), new Date()]);
    }

    async updateFacture(id: number, facture: FactureModel) {
        return await this.db.query("UPDATE facture SET created_by = ?, name = ?, description = ?, price = ?, duration = ?, type = ?, notification = ?, notification_interval = ?, updated_at = ? WHERE id = ?", [facture.created_by, facture.name, facture.description, facture.price, facture.duration, facture.type, facture.notification, facture.notification_interval, new Date(), id]);
    }


    async deleteFacture(id: number) {
        return await this.db.query("DELETE FROM facture WHERE id = ?", [id])
    }
}