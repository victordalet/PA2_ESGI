import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {Location} from "../../core/location";

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

    async locationIsOccupied(locationId: number, fromDatetime: string, toDatetime: string) {
        const [rows, filed] = await this.db.query("SELECT * FROM location_occupation WHERE location_id = ? AND deleted_at IS NULL", [locationId]);
        if (rows instanceof Array) {
            return rows.some((row: any) => {
                return (new Date(fromDatetime) >= new Date(row.from_datetime) && new Date(fromDatetime) <= new Date(row.to_datetime)) || (new Date(toDatetime) >= new Date(row.from_datetime) && new Date(toDatetime) <= new Date(row.to_datetime)) || (new Date(fromDatetime) <= new Date(row.from_datetime) && new Date(toDatetime) >= new Date(row.to_datetime));
            });
        }

    }

    async getLocationOccupationByUser(token: string): Promise<any> {
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows2, filed2] = await this.db.query("SELECT * FROM location_occupation WHERE user_email = ? AND deleted_at IS NULL", [rows[0].email]);
        const locations: any[] = [];
        if (rows2 instanceof Array) {
            for (let i = 0; i < rows2.length; i++) {
                const r: any = rows2[i];
                const [location, filed3] = await this.db.query("SELECT * FROM location WHERE id = ?", [r.location_id]);
                location[0].location_occupation_id = r.id;
                locations.push(location[0]);
            }
        }
        return locations;

    }

    async addLocationOccupation(locationId: number, token: string, fromDatetime: string, toDatetime: string) {
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        return this.db.query("INSERT INTO location_occupation (from_datetime, to_datetime, location_id, user_email) VALUES (?, ?, ?, ?)", [fromDatetime, toDatetime, locationId, rows[0].email]);
    }

    async deleteLocationOccupation(locationId: number) {
        return this.db.query("UPDATE location_occupation SET deleted_at = ? WHERE location_id = ? ", [new Date(), locationId]);
    }

    async locationIsOccupiedByUser(locationId: number, token: string) {
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows2, filed2] = await this.db.query("SELECT * FROM location_occupation WHERE location_id = ? AND user_email = ? AND deleted_at IS NULL", [locationId, rows[0].email]);
        if (rows2 instanceof Array) {
            return rows2.length > 0;
        }
    }

    async addNotationLocation(locationOccupationId: number, notation: number) {
        return this.db.query("UPDATE location_occupation SET notation = ? WHERE id = ?", [notation, locationOccupationId]);
    }

    async getNotationLocation(locationId: number) {
        const [rows, filed] = await this.db.query("SELECT notation FROM location_occupation WHERE location_id = ?", [locationId]);
        return rows;
    }

    async getMessagesByLocationOccupationId(locationOccupationId: number) {
        return this.db.query("SELECT * FROM location_message WHERE location_occupation_id = ?", [locationOccupationId]);
    }

    async addMessageToLocationOccupation(locationOccupationId: number, message: string) {
        return this.db.query("INSERT INTO location_message (created_at, updated_at, location_occupation_id, message) VALUES (?, ?, ?, ?)", [new Date(), new Date(), locationOccupationId, message]);
    }

}


