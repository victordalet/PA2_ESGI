"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRepository = void 0;
const mysql_entity_1 = require("../../database/mysql.entity");
class ProviderRepository {
    constructor() {
        this.database = new mysql_entity_1.DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }
    async getProviders() {
        const [rows, filed] = await this.db.query("SELECT * FROM provider");
        const providers = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                providers.push(row);
            });
        }
        return providers;
    }
    async createProvider(provider) {
        return this.db.query("INSERT INTO provider (name, created_at ,updated_at, description) VALUES (?, ?, ?, ?)", [provider.name, new Date(), new Date(), provider.description]);
    }
    async updateProvider(id, provider) {
        return this.db.query("UPDATE provider SET name = ?, updated_at = ?, description = ? WHERE id = ?", [provider.name, new Date(), provider.description, id]);
    }
    async deleteProvider(id) {
        return this.db.query("DELETE FROM provider WHERE id = ?", [id]);
    }
}
exports.ProviderRepository = ProviderRepository;
//# sourceMappingURL=provider.repository.js.map