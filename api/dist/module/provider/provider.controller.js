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
exports.ProviderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const provider_service_1 = require("./provider.service");
const provider_model_1 = require("./provider.model");
const token_validation_1 = require("../../validation/token/token.validation");
let ProviderController = class ProviderController {
    constructor() {
        this.providerService = new provider_service_1.ProviderService();
        this.tokenValidation = new token_validation_1.TokenValidation();
    }
    async getProviders(token) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.providerService.getProviders();
    }
    async createProvider(token, body) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.providerService.createProvider(body);
    }
    async updateProvider(token, id, body) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.providerService.updateProvider(id, body);
    }
    async deleteProvider(token, id) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.providerService.deleteProvider(id);
    }
};
exports.ProviderController = ProviderController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all providers' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of providers' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getProviders", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create provider' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Provider created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, provider_model_1.ProviderModel]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "createProvider", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update provider' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Provider updated' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, provider_model_1.ProviderModel]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "updateProvider", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete provider' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Provider  deleted' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "deleteProvider", null);
exports.ProviderController = ProviderController = __decorate([
    (0, common_1.Controller)({ path: 'provider' }),
    (0, swagger_1.ApiTags)('Provider'),
    __metadata("design:paramtypes", [])
], ProviderController);
//# sourceMappingURL=provider.controller.js.map