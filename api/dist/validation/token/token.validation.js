"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const common_1 = require("@nestjs/common");
const token_repository_1 = require("./token.repository");
class TokenValidation {
    constructor() {
        this.tokenRepository = new token_repository_1.TokenRepository();
    }
    async validateToken(token) {
        if (token === undefined || token === null || token === '')
            throw new common_1.HttpException('Token is not found', 401);
        if (await this.tokenRepository.isFoundToken(token) === false)
            throw new common_1.HttpException('Token is not valid', 401);
    }
    async validateAdminToken(token) {
        if (token === undefined || token === null || token === '')
            throw new common_1.HttpException('Token is not found', 401);
        if (await this.tokenRepository.isFoundToken(token) === false)
            throw new common_1.HttpException('Token is not valid', 401);
        if (await this.tokenRepository.isAdminToken(token) === false)
            throw new common_1.HttpException('You are not admin', 401);
    }
    async validateBailToken(token) {
        if (token === undefined || token === null || token === '')
            throw new common_1.HttpException('Token is not found', 401);
        if (await this.tokenRepository.isFoundToken(token) === false)
            throw new common_1.HttpException('Token is not valid', 401);
        if (await this.tokenRepository.isBailToken(token) === false) {
            if (await this.tokenRepository.isAdminToken(token) === false) {
                throw new common_1.HttpException('You are not bail or Admin', 401);
            }
        }
    }
}
exports.TokenValidation = TokenValidation;
//# sourceMappingURL=token.validation.js.map