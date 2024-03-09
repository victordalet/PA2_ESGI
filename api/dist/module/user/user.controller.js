"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const token_validation_1 = require("../../validation/token/token.validation");
let UserController = class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.tokenValidation = new token_validation_1.TokenValidation();
    }
    async getUser(token) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.GetUser();
    }
    async getUserByEmail(token, params) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.GetUserByEmail(params.email);
    }
    async getStats(token) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.getStats();
    }
    async createConnection(body) {
        return await this.userService.createConnection(body.email, body.password);
    }
    async createConnectionAdmin(body) {
        return await this.userService.createConnectionAdmin(body.email, body.password);
    }
    async isBail(token) {
        await this.tokenValidation.validateBailToken(token);
        return await this.userService.isBail();
    }
    async isAdmin(token) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.isAdmin();
    }
    async isUser(token) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.isUser();
    }
    async createUser(body) {
        return await this.userService.CreateUser(body);
    }
    async requestBail(token) {
        return await this.userService.requestBail(token);
    }
    async getRequestBail(token) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.getRequestBail();
    }
    async acceptRequestBail(token, body) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.acceptRequestBail(body.email);
    }
    async tokenToMail(token) {
        await this.tokenValidation.validateBailToken(token);
        return await this.userService.getEmailByToken(token);
    }
    async updateUser(token, body) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.UpdateUser(body);
    }
    async deleteUser(token, params) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.DeleteUser(params.email);
    }
    async deleteConnection(token, params) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.deleteConnection(params.email);
    }
    async updateEmail(token, body) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.updateEmail(body, token);
    }
    async updateUsername(token, body) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.updateUsername(body, token);
    }
    async updatePassword(token, body) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.updatePassword(body, token);
    }
    async updateRole(token, body) {
        return await this.userService.UpdateRole(body);
    }
    async updateRoleAdmin(token, body) {
        return await this.userService.UpdateRoleAdmin(body);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'No user found' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(':email'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by email' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'No user found' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.GetEmailUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByEmail", null);
__decorate([
    (0, common_1.Post)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get stats' }),
    (0, swagger_1.ApiOkResponse)({ description: 'stats' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'No stats found' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('connection'),
    (0, swagger_1.ApiOperation)({ summary: 'Create connection' }),
    (0, swagger_1.ApiOkResponse)({ description: 'connection' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createConnection", null);
__decorate([
    (0, common_1.Post)('connectionAdmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create connection admin' }),
    (0, swagger_1.ApiOkResponse)({ description: 'connection' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createConnectionAdmin", null);
__decorate([
    (0, common_1.Post)('isBail'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user is bail' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "isBail", null);
__decorate([
    (0, common_1.Post)('isAdmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user is admin' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "isAdmin", null);
__decorate([
    (0, common_1.Post)('isUser'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user is user' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "isUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create user' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('request-bail'),
    (0, swagger_1.ApiOperation)({ summary: 'Request bail' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "requestBail", null);
__decorate([
    (0, common_1.Post)('get-request-bail'),
    (0, swagger_1.ApiOperation)({ summary: 'Get request bail' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRequestBail", null);
__decorate([
    (0, common_1.Post)('accept-request-bail'),
    (0, swagger_1.ApiOperation)({ summary: 'Accept request bail' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "acceptRequestBail", null);
__decorate([
    (0, common_1.Post)('token-to-mail'),
    (0, swagger_1.ApiOperation)({ summary: 'Token to mail' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "tokenToMail", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update user' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':email'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.GetEmailUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Delete)('connection/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete connection' }),
    (0, swagger_1.ApiOkResponse)({ description: 'connection' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.GetEmailUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteConnection", null);
__decorate([
    (0, common_1.Patch)('email'),
    (0, swagger_1.ApiOperation)({ summary: 'Update email' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateEmail", null);
__decorate([
    (0, common_1.Patch)('username'),
    (0, swagger_1.ApiOperation)({ summary: 'Update username' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUsername", null);
__decorate([
    (0, common_1.Patch)('password'),
    (0, swagger_1.ApiOperation)({ summary: 'Update password' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Patch)('role'),
    (0, swagger_1.ApiOperation)({ summary: 'Update role' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Patch)('roleadmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update role to admin' }),
    (0, swagger_1.ApiOkResponse)({ description: 'user' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.UserBody]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateRoleAdmin", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)({ path: 'user' }),
    (0, swagger_1.ApiTags)('user'),
    __metadata("design:paramtypes", [])
], UserController);
//# sourceMappingURL=user.controller.js.map