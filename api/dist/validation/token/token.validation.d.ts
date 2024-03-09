export declare class TokenValidation {
    private tokenRepository;
    constructor();
    validateToken(token: string): Promise<void>;
    validateAdminToken(token: string): Promise<void>;
    validateBailToken(token: string): Promise<void>;
}
