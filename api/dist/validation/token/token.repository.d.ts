export declare class TokenRepository {
    private db;
    private database;
    constructor();
    isFoundToken(token: string): Promise<boolean>;
    isAdminToken(token: string): Promise<boolean>;
    isBailToken(token: string): Promise<boolean>;
}
