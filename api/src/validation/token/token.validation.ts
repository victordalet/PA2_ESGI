import {HttpException} from "@nestjs/common";
import {TokenRepository} from "./token.repository";

export class TokenValidation {
    private tokenRepository: TokenRepository;

    constructor() {
        this.tokenRepository = new TokenRepository();
    }

    async validateToken(token: string) {
        if (token === undefined || token === null || token === '') throw new HttpException('Token is not found', 401);
        if (await this.tokenRepository.isFoundToken(token) === false) throw new HttpException('Token is not valid', 401);
    }

    async validateAdminToken(token: string) {
        if (token === undefined || token === null || token === '') throw new HttpException('Token is not found', 401);
        if (await this.tokenRepository.isFoundToken(token) === false) throw new HttpException('Token is not valid', 401);
        if (await this.tokenRepository.isAdminToken(token) === false) throw new HttpException('You are not admin', 401);
    }

    async validateBailToken(token: string) {
        if (token === undefined || token === null || token === '') throw new HttpException('Token is not found', 401);
        if (await this.tokenRepository.isFoundToken(token) === false) throw new HttpException('Token is not valid', 401);
        if (await this.tokenRepository.isBailToken(token) === false) {
            if (await this.tokenRepository.isAdminToken(token) === false) {
                throw new HttpException('You are not bail or Admin', 401);
            }
        }
    }
}