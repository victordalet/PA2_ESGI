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

    async getLocations(): Promise<Location[]> {
        const [rows, filed] = await this.db.query("SELECT * FROM location");
        const [rows2, filed2] = await this.db.query("SELECT id,user_email FROM location_by_user_client");
        const locations: any[] = [];
        if (rows instanceof Array) {
            rows.forEach((row: any) => {
                locations.push(row);
                locations[locations.length - 1].is_occupy_by = (rows2 as any[]).filter((row2: any) => row2.location_id === row.id).map((row2: any) => row2.user_email);
            });
        }
        return locations;
    }

    async createLocation(location: any) {
        return this.db.query("INSERT INTO location (name, description, address, latitude, longitude, capacity, price, type, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [location.name, location.description, location.address, location.latitude, location.longitude, location.capacity, location.price, location.type, new Date(), new Date()]);
    }

    async updateLocation(id: number, location: any) {
        return this.db.query("UPDATE location SET name = ?, description = ?, address = ?, latitude = ?, longitude = ?, capacity = ?, price = ?, type = ?, updated_at = ? WHERE id = ?", [location.name, location.description, location.address, location.latitude, location.longitude, location.capacity, location.price, location.type, new Date(), id]);
    }

    async deleteLocation(id: number) {
        return this.db.query("DELETE FROM location WHERE id = ?", [id]);
    }
}