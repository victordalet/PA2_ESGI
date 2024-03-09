import { Language } from "../../core/langue";
export declare class LanguageController {
    private languageService;
    private tokenValidation;
    constructor();
    getLanguageName(): Promise<import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[]>;
    getLanguageFileByName(token: string, body: Language): Promise<[import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket").FieldPacket[]]>;
}
