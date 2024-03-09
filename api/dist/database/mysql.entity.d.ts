import { Connection } from "mysql2/promise";
export declare class DatabaseEntity {
    db: Connection;
    private static instance;
    constructor();
    getConnection(): Promise<void>;
}
