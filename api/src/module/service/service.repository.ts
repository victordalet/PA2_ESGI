import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {Service} from "../../core/service";
import {ServiceModel} from "./service.model";
import {LocationLiaison} from "../../core/location";

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
        const [rows2, filed2] = await this.db.query("SELECT user_email FROM service_by_user");
        const services: Service[] = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                services.push(row);
                services[services.length - 1].nb_use = 0;
                if (rows2 instanceof Array) {
                    rows2.forEach((row2) => {
                        if (row2.email === row.email) {
                            services[services.length - 1].nb_use++;
                        }
                    });
                }
            });
        }
        return services;
    }

    async getServiceByEmail(token: string): Promise<Service[]> {
        const [rows3, filed3] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows, filed] = await this.db.query("SELECT * FROM service WHERE created_by = ?", [rows3[0].email]);
        const [rows2, filed2] = await this.db.query("SELECT user_email FROM service_by_user");
        const services: Service[] = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                services.push(row);
                services[services.length - 1].nb_use = 0;
                if (rows2 instanceof Array) {
                    rows2.forEach((row2) => {
                        if (row2.email === row.email) {
                            services[services.length - 1].nb_use++;
                        }
                    });
                }
            });
        }
        return services;
    }

    async createService(service: ServiceModel) {
        return this.db.query("INSERT INTO service (name, created_at ,updated_at, description, price, duration, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [service.name, new Date(), new Date(), service.description, service.price, service.duration, service.created_by]);
    }

    async updateService(id: number, service: ServiceModel) {
        return this.db.query("UPDATE service SET name = ?, updated_at = ?, description = ? WHERE id = ?", [service.name, new Date(), service.description, id]);
    }

    async deleteService(id: number) {
        return this.db.query("DELETE FROM service WHERE id = ?", [id]);
    }


    async postServiceByUser(body: LocationLiaison) {
        return this.db.query("INSERT INTO service_by_user (created_at,updated_at,location_occupation_id, service_id) VALUES (?, ?, ?, ?)",
            [new Date(), new Date(), body.location_occupation_id, body.service_id]);
    }

    async postServiceByLocation(body: LocationLiaison) {
        return this.db.query("INSERT INTO service_by_location (location_id, service_id) VALUES (?, ?)", [body.location_id, body.service_id]);
    }

    async getServiceByLocation(body: LocationLiaison) {
        const [rows, filed] = await this.db.query("SELECT * FROM service_by_location WHERE location_id = ?", [body.location_id]);
        const [rows2, filed2] = await this.db.query("SELECT * FROM service");
        const services = [];
        if (rows instanceof Array && rows2 instanceof Array) {
            rows.forEach(async (row) => {
                rows2.forEach(async (row2) => {
                    if (row2.id === row.service_id) {
                        services.push(row2);
                    }
                });
            });
        }
        return services
    }

    async getServiceByUser(body: LocationLiaison) {
        const [rows, filed] = await this.db.query("SELECT service_id FROM service_by_user WHERE location_occupation_id = ?", [body.location_occupation_id]);
        const [rows2, filed2] = await this.db.query("SELECT * FROM service");
        const services = [];
        if (rows instanceof Array && rows2 instanceof Array) {
            rows.forEach(async (row) => {
                rows2.forEach(async (row2) => {
                    if (row2.id === row.service_id) {
                        services.push(row2);
                    }
                });
            });
        }
        return services;
    }
}