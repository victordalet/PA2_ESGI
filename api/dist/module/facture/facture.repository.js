"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactureRepository = void 0;
const mysql_entity_1 = require("../../database/mysql.entity");
class FactureRepository {
    constructor() {
        this.database = new mysql_entity_1.DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }
    async getFactures() {
        const [rows, filed] = await this.db.query("SELECT * FROM FACTURE");
        const factures = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                factures.push(row);
            });
        }
        return factures;
    }
    async createFacture(facture) {
        return this.db.query("INSERT INTO FACTURE (created_by, name, description, price, duration, type, notification, notification_interval, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [facture.created_by, facture.name, facture.description, facture.price, facture.duration, facture.type, facture.notification, facture.notification_interval, new Date(), new Date()]);
    }
    async updateFacture(id, facture) {
        return this.db.query("UPDATE FACTURE SET created_by = ?, name = ?, description = ?, price = ?, duration = ?, type = ?, notification = ?, notification_interval = ?, updated_at = ? WHERE id = ?", [facture.created_by, facture.name, facture.description, facture.price, facture.duration, facture.type, facture.notification, facture.notification_interval, new Date(), id]);
    }
    async deleteFacture(id) {
        return this.db.query("DELETE FROM FACTURE WHERE id = ?", [id]);
    }
}
exports.FactureRepository = FactureRepository;
//# sourceMappingURL=facture.repository.js.map