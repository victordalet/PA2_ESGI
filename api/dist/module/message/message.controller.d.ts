import { BodyMessage } from "./message.model";
export declare class MessageController {
    private messageService;
    private tokenValidation;
    constructor();
    getMessages(token: string): Promise<any[]>;
    getMessageByMail(token: string, email: string): Promise<any[]>;
    getMessageByMailTo(token: string, email: string): Promise<any[]>;
    createMessage(token: string, body: BodyMessage): Promise<[import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket").FieldPacket[]]>;
    updateMessage(token: string, id: number, body: BodyMessage): Promise<[import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket").FieldPacket[]]>;
    deleteMessage(token: string, id: number): Promise<[import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket").FieldPacket[]]>;
    getIllegibleMessages(token: string): Promise<{
        created_by: string;
        nb_illegible_words: number;
    }[]>;
    addIllegibleWord(token: string, body: {
        word: string;
    }): Promise<[import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket").FieldPacket[]]>;
}
