import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {Service} from "../../core/service";
import {ServiceModel} from "./service.model";
import {LocationAvailability, LocationLiaison} from "../../core/location";

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
        await this.db.connect()
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
        await this.db.connect()
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

    async createService(service: ServiceModel, nfc: string) {
        await this.db.connect()
        await this.db.query("INSERT INTO service (name, created_at ,updated_at, description, price, duration, created_by, type, siret, is_valid,schedule,city,nfc, is_vip) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)",
            [service.name, new Date(), new Date(), service.description, service.price, service.duration, service.created_by, service.type, service.siret, 0, service.schedule, service.city, nfc, service.is_vip]);
        const [rows, filed] = await this.db.query("SELECT LAST_INSERT_ID() as id  FROM service");
        return rows[0];

    }

    async updateService(id: number, service: ServiceModel) {
        await this.db.connect()
        return this.db.query("UPDATE service SET name = ?, updated_at = ?, description = ? WHERE id = ?", [service.name, new Date(), service.description, id]);
    }

    async deleteService(id: number) {
        await this.db.connect()
        return this.db.query("DELETE FROM service WHERE id = ?", [id]);
    }


    async postServiceByUser(body: LocationLiaison) {
        await this.db.connect();
        const [rows, filed] = await this.db.query("SELECT * FROM service WHERE id = ?", [body.service_id]);
        const time = (new Date(body.to_datetime).getTime() - new Date(body.from_datetime).getTime()) / 60000;
        const servicePrice = rows[0].price;
        const serviceDuration = rows[0].duration;
        const finalPrice = (time / serviceDuration) * servicePrice;
        return this.db.query("UPDATE occupation_request_service SET status = 'good',price=?, from_datetime=?, to_datetime=? WHERE id = ?", [finalPrice, body.from_datetime, body.to_datetime, body.location_occupation_id]);
    }

    async getServiceByUserV2(body: LocationLiaison) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM occupation_request_service WHERE location_occupation_id = ?", [body.location_occupation_id]);
        return rows;
    }

    async serviceIsHere(body: LocationLiaison) {
        await this.db.connect();
        return await this.db.query("UPDATE occupation_request_service SET status = 'valid' WHERE id = ?", [body.id]);
    }

    async postServiceByLocation(body: LocationLiaison) {
        await this.db.connect()
        return this.db.query("INSERT INTO service_by_location (location_id, service_id) VALUES (?, ?)", [body.location_id, body.service_id]);
    }

    async isYourServices(token: string, body: LocationAvailability) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows_2, filed_2] = await this.db.query("SELECT * FROM service WHERE created_by = ?", [rows[0].email]);
        if (rows_2 instanceof Array) {
            for (const row of rows_2) {
                // @ts-ignore
                if (row.id == body.id) {
                    return true;
                }
            }
        }
        return false;

    }

    async getServiceByLocation(body: LocationLiaison) {
        await this.db.connect()
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
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT service_id, (select price from service where id = service_id) as price,user_email,location_occupation_id,notation,status,from_datetime,to_datetime,(select address from location where id = (select location_id from location_occupation where id = location_occupation_id )) as title FROM service_by_user WHERE service_id = ?",
            [body.service_id]);
        return rows;
    }

    async notationServiceByUser(body: ServiceModel, token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        if (rows)
            return this.db.query("UPDATE service_by_user SET notation = ? WHERE service_id = ? and user_email = ?", [body.notation, body.service_id, rows[0].email]);
    }

    async notationServiceByLocation(body: ServiceModel, token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        if (rows)
            return this.db.query("UPDATE service_by_location SET notation = ? WHERE service_id = ? and ", [body.notation, body.service_id]);
    }

    async getLocationByServiceIdBail(service_id: number) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT location_id FROM service_by_location WHERE service_id = ?", [service_id]);
        if (rows) {
            const [rows2, filed2] = await this.db.query("SELECT * FROM location WHERE id = ?", [rows[0].location_id]);
            return rows2;
        }
    }

    async getLocationByServiceIdClient(service_id: number) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT location_id FROM service_by_user WHERE service_id = ?", [service_id]);
        if (rows) {
            const [rows2, filed2] = await this.db.query("SELECT * FROM location WHERE id = ?", [rows[0].location_occupation_id]);
            return rows2;
        }
    }

    async removeLocationByServiceIdClient(service_id: number, location_occupation_id: number, token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        if (rows)
            return this.db.query("DELETE FROM service_by_user WHERE service_id = ? AND location_occupation_id = ? and user_email = ?",
                [service_id, location_occupation_id, rows[0].email]);
    }

    async removeLocationByServiceIdBail(service_id: number, location_id: number, token: string) {
        await this.db.connect()
        return this.db.query("DELETE FROM service_by_location WHERE service_id = ? AND location_id = ?",
            [service_id, location_id]);
    }

    async deleteServiceByAdmin(id: number) {
        await this.db.connect()
        return this.db.query("DELETE FROM service WHERE id = ?", [id]);
    }

    async adminAcceptService(service_id: number) {
        await this.db.connect()
        return this.db.query("UPDATE service SET is_valid = 1 WHERE id = ?", [service_id]);
    }
}