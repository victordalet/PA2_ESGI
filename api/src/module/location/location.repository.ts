import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";

export class LocationRepository {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getLocations() {
        const [rows, filed] = await this.db.query("SELECT * FROM LOCATION");
        const locations: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                locations.push(row);
            });
        }
        return locations;
    }

    async createLocation(location: any) {
        return this.db.query("INSERT INTO LOCATION (name, description, address, latitude, longitude, capacity, price, type, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [location.name, location.description, location.address, location.latitude, location.longitude, location.capacity, location.price, location.type, new Date(), new Date()]);
    }

    async updateLocation(id: number, location: any) {
        return this.db.query("UPDATE LOCATION SET name = ?, description = ?, address = ?, latitude = ?, longitude = ?, capacity = ?, price = ?, type = ?, updated_at = ? WHERE id = ?", [location.name, location.description, location.address, location.latitude, location.longitude, location.capacity, location.price, location.type, new Date(), id]);
    }

    async deleteLocation(id: number) {
        return this.db.query("DELETE FROM LOCATION WHERE id = ?", [id]);
    }
}