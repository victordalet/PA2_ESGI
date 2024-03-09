import { Language } from "../../core/langue";
export declare class LanguageService {
    private languageRepository;
    constructor();
    getLanguageFileByName(): Promise<import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[]>;
    postWord(languageParam: Language): Promise<[import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket").FieldPacket[]]>;
}
