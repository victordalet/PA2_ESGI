import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {Service} from "../../core/service";
import {ServiceByServiceModel, ServiceModel} from "./service.model";
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
        await this.db.query("UPDATE occupation_request_service SET status = 'good',price=?, from_datetime=?, to_datetime=?,service_id=? WHERE id = ?", [finalPrice, body.from_datetime, body.to_datetime, body.service_id, body.location_occupation_id]);
        const [rows2, filed2] = await this.db.query("SELECT city,user_email FROM location WHERE id = (select location_id from occupation_request_service where id = ?)", [body.location_occupation_id]);
        return {address: rows2[0].city, price: finalPrice, email: rows2[0].user_email};
    }

    async getServiceByUserV2(body: LocationLiaison) {
        await this.db.connect()
        if (body.location_occupation_id !== 0) {
            const [rows, filed] = await this.db.query("SELECT *, if(service_id IS NOT NULL, (select nfc from service where id = occupation_request_service.service_id), (select 0)) as nfc FROM occupation_request_service WHERE location_occupation_id = ?", [body.location_occupation_id]);
            return rows;
        } else {
            const [rows, filed] = await this.db.query("SELECT *,(select latitude from location where id = (select location_id from location_occupation where id =occupation_request_service.location_occupation_id )) as latitude,(select longitude from location where id = (select location_id from location_occupation where id =occupation_request_service.location_occupation_id )) as longitude FROM occupation_request_service WHERE service_id = ?", [body.service_id]);
            return rows;
        }
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

    async addServiceByService(token: string, body: ServiceByServiceModel) {
        await this.db.connect();
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        if (rows)
            return this.db.query("INSERT INTO occupation_request_service (created_at,location_occupation_id,service_name,user_email,description,status,city,from_datetime,to_datetime,service_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [new Date(), 0, 'OCCUPY', rows[0].email, 'OCCUPY', 'valid', '', body.from, body.to, body.service_id]);
    }

    async paidPresentation(serviceId: number, uidPayment: string) {
        await this.db.connect()
        return this.db.query("UPDATE occupation_request_service SET uid_payment = ? WHERE id = ?", [uidPayment, serviceId]);
    }

    async isFreeService(token: string): Promise<boolean> {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows2, filed2] = await this.db.query("SELECT * FROM subscription WHERE user_email = ? and (is_pay is NULL or is_pay = '') ", [rows[0].email]);
        const [rows3, filed3] = await this.db.query("SELECT * FROM occupation_request_service WHERE user_email = ? and created_at > DATE_SUB(NOW(), INTERVAL 3 MONTH)", [rows[0].email]);
        try {
            const [rows4, filed4] = await this.db.query("select free from price_sub where price = ?", [rows2[0].price]);
            if (rows2 && rows3 && rows4) {
                if (rows4[0].free == 1) {
                    return true;
                }
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    async isReductionService(price: number, token: string): Promise<number> {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows2, filed2] = await this.db.query("SELECT * FROM subscription WHERE user_email = ? and (is_pay is NULL or is_pay = '')", [rows[0].email]);
        try {
            const [rows3, filed3] = await this.db.query("select reduce from price_sub where price = ?", [rows2[0].price]);
            if (rows2 && rows3) {
                return price * (1 - (parseInt(rows3[0].reduce) / 100));
            }
            return price;
        } catch (e) {
            return price;
        }
    }


    async validatePayment(uid: string) {
        await this.db.connect()
        return this.db.query("UPDATE occupation_request_service SET status = 'pay' WHERE uid_payment = ?", [uid]);
    }
}