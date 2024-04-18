import {Connection} from "mysql2/promise";
import {DatabaseEntity} from "../../database/mysql.entity";

export class TypeLocationRepository {
    private db: Connection;
    private database: DatabaseEntity;

    constructor() {
        this.database = new DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }

    async getTypeLocation() {
        await this.db.connect();
        const [rows, filed] = await this.db.query("SELECT * FROM icon_location");
        return rows;
    }

    async createTypeLocation(typeLocation: string) {
        await this.db.connect();
        await this.db.query("INSERT INTO icon_location (name) VALUES(?)", [typeLocation]);
    }

    async associateTypeLocation(id: number, typeLocation: string) {
        await this.db.connect();
        await this.db.query("INSERT INTO location_icon_location (location_id, icon_location_id) VALUES(?,?)", [id, typeLocation]);
    }
}