import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {Service} from "../../core/service";
import {ServiceModel} from "./service.model";

export class ServiceRepository {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getServices(): Promise<Service[]> {
        const [rows, filed] = await this.db.query("SELECT * FROM service");
        const services: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                services.push(row);
            });
        }
        return services;
    }

    async createService(service: ServiceModel) {
        return this.db.query("INSERT INTO service (name, created_at ,updated_at, description) VALUES (?, ?, ?, ?)", [service.name, new Date(), new Date(), service.description]);
    }

    async updateService(id: number, service: ServiceModel) {
        return this.db.query("UPDATE service SET name = ?, updated_at = ?, description = ? WHERE id = ?", [service.name, new Date(), service.description, id]);
    }

    async deleteService(id: number) {
        return this.db.query("DELETE FROM service WHERE id = ?", [id]);
    }
}