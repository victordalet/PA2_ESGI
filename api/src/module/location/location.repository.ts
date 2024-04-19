import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";
import {Location, LocationAvailability} from "../../core/location";

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
        //await this.db.connect()
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

    async getLocationByEmail(token: string): Promise<Location[]> {
        await this.db.connect()
        const [rows3, filed3] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows, filed] = await this.db.query("SELECT * FROM location WHERE created_by = ?", [rows3[0].email]);
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

    async createLocation(location: Location) {
        await this.db.connect()
        await this.db.query("INSERT INTO location (name, description, address, latitude, longitude, capacity, price, type, created_at, updated_at,created_by,picture,description_json,icons,is_valid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)",
            [location.name,
                location.description,
                location.address,
                location.latitude,
                location.longitude,
                location.capacity,
                location.price,
                location.type,
                new Date(), new Date(),
                location.created_by, ' ',
                location.description_json,
                location.icons,
                0,]);
        const [rows, filed] = await this.db.query("SELECT LAST_INSERT_ID() as id FROM location");
        return rows[0];
    }

    async updateLocation(id: number, location: any) {
        await this.db.connect()
        return this.db.query("UPDATE location SET name = ?, description = ?, address = ?, latitude = ?, longitude = ?, capacity = ?, price = ?, type = ?, updated_at = ? WHERE id = ?", [location.name, location.description, location.address, location.latitude, location.longitude, location.capacity, location.price, location.type, new Date(), id]);
    }

    async deleteLocation(id: number, token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        if (rows) {
            await this.db.query("DELETE FROM location WHERE id = ? and created_by = ?", [id, rows[0].email]);
            await this.db.query("DELETE FROM location_occupation WHERE location_id = ?", [id]);
            await this.db.query("DELETE FROM service_by_location WHERE location_id = ?", [id]);
            return;
        }

    }

    async locationIsOccupied(locationId: number) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT * FROM location_occupation WHERE location_id = ? AND deleted_at IS NULL", [locationId]);
        return rows;

    }

    async getLocationOccupationByUser(token: string): Promise<any> {
        await this.db.connect()
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
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        await this.db.query("INSERT INTO location_occupation (from_datetime, to_datetime, location_id, user_email, `repeat`) VALUES (?, ?, ?, ?,?)",
            [fromDatetime, toDatetime, locationId, rows[0].email, 'none']);
        const [rows2, filed2] = await this.db.query("SELECT LAST_INSERT_ID() as id FROM location_occupation");
        return rows2[0].id;
    }

    async deleteLocationOccupation(locationId: number, token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows2, filed2] = await this.db.query("SELECT location_id from location_occupation WHERE id = ?", [locationId]);
        const [rows3, filed3] = await this.db.query("SELECT created_by from location WHERE id = ?", [rows2[0].location_id]);
        if (rows3[0].created_by == rows[0].email) {
            return this.db.query("UPDATE location_occupation SET deleted_at = ? WHERE id = ? ", [new Date(), locationId]);
        } else
            return this.db.query("UPDATE location_occupation SET deleted_at = ? WHERE id = ? and user_email = ? ", [new Date(), locationId, rows[0].email]);

    }

    async adminAcceptLocationOccupation(locationId: number) {
        await this.db.connect()
        return this.db.query("UPDATE location SET is_valid = 1 WHERE id = ?", [locationId]);
    }

    async locationIsOccupiedByUser(locationId: number, token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows2, filed2] = await this.db.query("SELECT * FROM location_occupation WHERE location_id = ? AND user_email = ? AND deleted_at IS NULL",
            [locationId, rows[0].email]);
        if (rows2 instanceof Array) {
            return rows2.length > 0;
        }
    }

    async getLocationOccupation(locationId: number) {
        await this.db.connect();
        const [rows, filed] = await this.db.query("SELECT * FROM location_occupation WHERE location_id = ? AND deleted_at IS NULL", [locationId]);
        return rows;
    }

    async addNotationLocation(locationOccupationId: number, notation: number, token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        if (rows)
            return this.db.query("UPDATE location_occupation SET notation = ? WHERE id = ? and user_email = ?",
                [notation, locationOccupationId, rows[0].email]);
    }

    async getNotationLocation(locationId: number) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT notation FROM location_occupation WHERE location_id = ?", [locationId]);
        return rows;
    }

    async getMessagesByLocationOccupationId(locationOccupationId: number, token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        if (rows) {
            const [rows2, filed2] = await this.db.query("SELECT * FROM location_occupation WHERE id = ?", [locationOccupationId]);
            if (rows2) {
                const [rows3, filed3] = await this.db.query("SELECT * from location WHERE id = ?", [rows2[0].location_id]);
                if (rows3) {
                    if (rows3[0].created_by === rows[0].email || rows2[0].user_email === rows[0].email) {
                        return this.db.query("SELECT * FROM location_message WHERE location_occupation_id = ? ",
                            [locationOccupationId]);
                    }
                }
            }
        }
    }

    async getLocationOccupationInfoByAdmin() {
        await this.db.connect();
        const sqlRequest: string = "select location_id,from_datetime,to_datetime,notation,user_email, (select name from location where id = location_id) as location_name,(select created_by from location where id = location_id)  as created_by , (select count(*) as message from location_message where location_occupation_id = id) as nb_message from location_occupation where deleted_at is null";
        const [rows, filed] = await this.db.query(sqlRequest);
        return rows;

    }

    async addLocationOccupationByBail(locationId: number, token: string, fromDatetime: string, toDatetime: string, repeat: string) {
        await this.db.connect();
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        await this.db.query("INSERT INTO location_occupation (from_datetime, to_datetime, location_id, user_email, `repeat`) VALUES (?, ?, ?, ?, ?)",
            [fromDatetime, toDatetime, locationId, rows[0].email, repeat]);
        const [rows2, filed2] = await this.db.query("SELECT LAST_INSERT_ID() as id FROM location_occupation");
        return rows2[0].id;
    }

    async addMessageToLocationOccupation(locationOccupationId: number, message: string, token: string) {
        await this.db.connect()
        const [rows, filed] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        const [rows2, filed2] = await this.db.query("SELECT * FROM location_occupation WHERE id = ?", [locationOccupationId]);
        const [rows3, filed3] = await this.db.query("SELECT * from location WHERE id = ?", [rows2[0].location_id]);
        if (rows && rows2 && rows3) {
            if (rows3[0].created_by === rows[0].email || rows2[0].user_email === rows[0].email) {
                await this.db.query("INSERT INTO message (message, created_at, updated_at, to_user, created_by) VALUES (?, ?, ?, ?, ?)",
                    [message, new Date(), new Date(), ' ', rows[0].email]);
                return this.db.query("INSERT INTO location_message (created_at, updated_at, location_occupation_id, message) VALUES (?, ?, ?, ?)",
                    [new Date(), new Date(), locationOccupationId, message]);
            }
        }
    }

    async deleteLocationByAdmin(locationId: number) {
        await this.db.connect()
        this.db.query("DELETE FROM location WHERE id = ?", [locationId]);
        await this.db.query("DELETE FROM location_occupation WHERE location_id = ?", [locationId]);
        await this.db.query("DELETE FROM service_by_location WHERE location_id = ?", [locationId]);
        return
    }


}