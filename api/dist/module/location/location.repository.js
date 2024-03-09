"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRepository = void 0;
const mysql_entity_1 = require("../../database/mysql.entity");
class LocationRepository {
    constructor() {
        this.database = new mysql_entity_1.DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }
    async getLocations() {
        const [rows, filed] = await this.db.query("SELECT * FROM location");
        const [rows2, filed2] = await this.db.query("SELECT id,user_email FROM location_by_user_client");
        const locations = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                locations.push(row);
                locations[locations.length - 1].is_occupy_by = rows2.filter((row2) => row2.location_id === row.id).map((row2) => row2.user_email);
            });
        }
        return locations;
    }
    async getLocationByEmail(token) {
        const [rows3, filed3] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows, filed] = await this.db.query("SELECT * FROM location WHERE created_by = ?", [rows3[0].email]);
        const [rows2, filed2] = await this.db.query("SELECT id,user_email FROM location_by_user_client");
        const locations = [];
        if (rows instanceof Array) {
            rows.forEach((row) => {
                locations.push(row);
                locations[locations.length - 1].is_occupy_by = rows2.filter((row2) => row2.location_id === row.id).map((row2) => row2.user_email);
            });
        }
        return locations;
    }
    async createLocation(location) {
        return this.db.query("INSERT INTO location (name, description, address, latitude, longitude, capacity, price, type, created_at, updated_at,created_by,picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)", [location.name,
            location.description,
            location.address,
            location.latitude,
            location.longitude,
            location.capacity,
            location.price,
            location.type,
            new Date(), new Date(),
            location.created_by, ' ']);
    }
    async updateLocation(id, location) {
        return this.db.query("UPDATE location SET name = ?, description = ?, address = ?, latitude = ?, longitude = ?, capacity = ?, price = ?, type = ?, updated_at = ? WHERE id = ?", [location.name, location.description, location.address, location.latitude, location.longitude, location.capacity, location.price, location.type, new Date(), id]);
    }
    async deleteLocation(id) {
        return this.db.query("DELETE FROM location WHERE id = ?", [id]);
    }
    async locationIsOccupied(locationId, fromDatetime, toDatetime) {
        const [rows, filed] = await this.db.query("SELECT * FROM location_occupation WHERE location_id = ? AND deleted_at IS NULL", [locationId]);
        if (rows instanceof Array) {
            return rows.some((row) => {
                return (new Date(fromDatetime) >= new Date(row.from_datetime) && new Date(fromDatetime) <= new Date(row.to_datetime)) || (new Date(toDatetime) >= new Date(row.from_datetime) && new Date(toDatetime) <= new Date(row.to_datetime)) || (new Date(fromDatetime) <= new Date(row.from_datetime) && new Date(toDatetime) >= new Date(row.to_datetime));
            });
        }
    }
    async getLocationOccupationByUser(token) {
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows2, filed2] = await this.db.query("SELECT * FROM location_occupation WHERE user_email = ? AND deleted_at IS NULL", [rows[0].email]);
        const locations = [];
        if (rows2 instanceof Array) {
            for (let i = 0; i < rows2.length; i++) {
                const r = rows2[i];
                const [location, filed3] = await this.db.query("SELECT * FROM location WHERE id = ?", [r.location_id]);
                location[0].location_occupation_id = r.id;
                locations.push(location[0]);
            }
        }
        return locations;
    }
    async addLocationOccupation(locationId, token, fromDatetime, toDatetime) {
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        await this.db.query("INSERT INTO location_occupation (from_datetime, to_datetime, location_id, user_email) VALUES (?, ?, ?, ?)", [fromDatetime, toDatetime, locationId, rows[0].email]);
        const [rows2, filed2] = await this.db.query("SELECT LAST_INSERT_ID() as id FROM location_occupation");
        return rows2[0].id;
    }
    async deleteLocationOccupation(locationId) {
        return this.db.query("UPDATE location_occupation SET deleted_at = ? WHERE location_id = ? ", [new Date(), locationId]);
    }
    async locationIsOccupiedByUser(locationId, token) {
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows2, filed2] = await this.db.query("SELECT * FROM location_occupation WHERE location_id = ? AND user_email = ? AND deleted_at IS NULL", [locationId, rows[0].email]);
        if (rows2 instanceof Array) {
            return rows2.length > 0;
        }
    }
    async addNotationLocation(locationOccupationId, notation) {
        return this.db.query("UPDATE location_occupation SET notation = ? WHERE id = ?", [notation, locationOccupationId]);
    }
    async getNotationLocation(locationId) {
        const [rows, filed] = await this.db.query("SELECT notation FROM location_occupation WHERE location_id = ?", [locationId]);
        return rows;
    }
    async getMessagesByLocationOccupationId(locationOccupationId) {
        return this.db.query("SELECT * FROM location_message WHERE location_occupation_id = ?", [locationOccupationId]);
    }
    async addMessageToLocationOccupation(locationOccupationId, message) {
        return this.db.query("INSERT INTO location_message (created_at, updated_at, location_occupation_id, message) VALUES (?, ?, ?, ?)", [new Date(), new Date(), locationOccupationId, message]);
    }
}
exports.LocationRepository = LocationRepository;
//# sourceMappingURL=location.repository.js.map