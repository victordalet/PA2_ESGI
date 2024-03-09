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
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_service_1 = require("./service.service");
const service_model_1 = require("./service.model");
const token_validation_1 = require("../../validation/token/token.validation");
let ServiceController = class ServiceController {
    constructor() {
        this.serviceService = new service_service_1.ServiceService();
        this.tokenValidation = new token_validation_1.TokenValidation();
    }
    async getServices(token) {
        return this.serviceService.getServices();
    }
    async getServiceById(token) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.getServiceByEmail(token);
    }
    async postServiceByLocation(token, body) {
        await this.tokenValidation.validateBailToken(token);
        return this.serviceService.postServiceByLocation(body);
    }
    async postServiceByUser(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.postServiceByUser(token, body);
    }
    async getServiceByLocation(token, body) {
        await this.tokenValidation.validateBailToken(token);
        return this.serviceService.getServiceByLocation(body);
    }
    async getServiceByUser(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.getServiceByUser(body);
    }
    async createService(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.createService(body);
    }
    async updateService(token, id, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.serviceService.updateService(id, body);
    }
    async deleteService(token, id) {
        await this.tokenValidation.validateAdminToken(token);
        return this.serviceService.deleteService(id);
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple services' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of services' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getServices", null);
__decorate([
    (0, common_1.Post)('service-by-email'),
    (0, swagger_1.ApiOperation)({ summary: 'Get service by id' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Service' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getServiceById", null);
__decorate([
    (0, common_1.Post)('service-by-location'),
    (0, swagger_1.ApiOperation)({ summary: 'Post service by location' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Service' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "postServiceByLocation", null);
__decorate([
    (0, common_1.Post)('service-by-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Post service by user' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Service' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "postServiceByUser", null);
__decorate([
    (0, common_1.Post)('get-service-by-location'),
    (0, swagger_1.ApiOperation)({ summary: 'Post service by location' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Service' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getServiceByLocation", null);
__decorate([
    (0, common_1.Post)('get-service-by-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Post service by user' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Service' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "getServiceByUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create service' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Service created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, service_model_1.ServiceModel]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "createService", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update service' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Service updated' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, service_model_1.ServiceModel]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "updateService", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete service' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Service deleted' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "deleteService", null);
exports.ServiceController = ServiceController = __decorate([
    (0, common_1.Controller)('service'),
    (0, swagger_1.ApiTags)('Service'),
    __metadata("design:paramtypes", [])
], ServiceController);
//# sourceMappingURL=service.controller.js.map