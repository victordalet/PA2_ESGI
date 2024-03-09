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
exports.FactureController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const facture_model_1 = require("./facture.model");
const facture_service_1 = require("./facture.service");
const token_validation_1 = require("../../validation/token/token.validation");
let FactureController = class FactureController {
    constructor() {
        this.factureService = new facture_service_1.FactureService();
        this.tokenValidation = new token_validation_1.TokenValidation();
    }
    async getFactures(token) {
        await this.tokenValidation.validateAdminToken(token);
        return this.factureService.getFactures();
    }
    async createFacture(token, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.factureService.createFacture(body);
    }
    async updateFacture(token, id, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.factureService.updateFacture(id, body);
    }
    async deleteFacture(token, id) {
        await this.tokenValidation.validateAdminToken(token);
        return this.factureService.deleteFacture(id);
    }
};
exports.FactureController = FactureController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple factures' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of factures' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FactureController.prototype, "getFactures", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create facture' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Facture created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, facture_model_1.FactureModel]),
    __metadata("design:returntype", Promise)
], FactureController.prototype, "createFacture", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update facture' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Facture updated' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, facture_model_1.FactureModel]),
    __metadata("design:returntype", Promise)
], FactureController.prototype, "updateFacture", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete facture' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Facture deleted' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], FactureController.prototype, "deleteFacture", null);
exports.FactureController = FactureController = __decorate([
    (0, common_1.Controller)({ path: 'facture' }),
    (0, swagger_1.ApiTags)('facture'),
    __metadata("design:paramtypes", [])
], FactureController);
//# sourceMappingURL=facture.controller.js.map