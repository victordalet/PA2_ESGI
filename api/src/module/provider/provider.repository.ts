import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {ProviderModel} from "./provider.model";
import {Provider} from "../../core/provider";

export class ProviderRepository {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getProviders(): Promise<Provider[]> {
        const [rows, filed] = await this.db.query("SELECT * FROM provider");
        const providers: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                providers.push(row);
            });
        }
        return providers;
    }

    async createProvider(provider: ProviderModel) {
        return this.db.query("INSERT INTO provider (name, created_at ,updated_at, description) VALUES (?, ?, ?, ?)", [provider.name, new Date(), new Date(), provider.description]);
    }

    async updateProvider(id: number, provider: ProviderModel) {
        return this.db.query("UPDATE provider SET name = ?, updated_at = ?, description = ? WHERE id = ?", [provider.name, new Date(), provider.description, id]);
    }

    async deleteProvider(id: number) {
        return this.db.query("DELETE FROM provider WHERE id = ?", [id]);
    }
}