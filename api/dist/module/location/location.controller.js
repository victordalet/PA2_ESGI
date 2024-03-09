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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const location_service_1 = require("./location.service");
const location_model_1 = require("./location.model");
const token_validation_1 = require("../../validation/token/token.validation");
let LocationController = class LocationController {
    constructor() {
        this.locationService = new location_service_1.LocationService();
        this.tokenValidation = new token_validation_1.TokenValidation();
    }
    async getLocations(token) {
        return this.locationService.getLocations();
    }
    async getLocationById(token) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.getLocationByEmail(token);
    }
    async createLocation(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.createLocation(body);
    }
    async addLocationOccupation(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.addLocationOccupation(body, token);
    }
    async locationIsOccupiedByUser(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.locationIsOccupiedByUser(body.location_id, token);
    }
    async addLocationNotation(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.addLocationNotation(body.location_id, body.notation);
    }
    async getNotationLocation(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.getNotationLocation(body.location_id);
    }
    async locationIsOccupied(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.locationIsOccupied(body);
    }
    async addMessageByLocationOccupationId(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.addMessageByLocationOccupationId(body.location_occupation_id, body.message);
    }
    async getMessagesByLocationOccupationId(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.getMessagesByLocationOccupationId(body.location_id);
    }
    async getLocationOccupationByUser(token) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.getLocationOccupationByUser(token);
    }
    async updateLocation(token, id, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.locationService.updateLocation(id, body);
    }
    async deleteLocation(token, id) {
        await this.tokenValidation.validateBailToken(token);
        return this.locationService.deleteLocation(id);
    }
    async deleteLocationOccupation(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.deleteLocationOccupation(body.location_id);
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple locations' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of locations' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocations", null);
__decorate([
    (0, common_1.Post)('location-by-email'),
    (0, swagger_1.ApiOperation)({ summary: 'Get location by id' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Location' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocationById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create location' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Location created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, location_model_1.LocationModel]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "createLocation", null);
__decorate([
    (0, common_1.Post)('occupation'),
    (0, swagger_1.ApiOperation)({ summary: 'Add location occupation' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Location occupation added' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "addLocationOccupation", null);
__decorate([
    (0, common_1.Post)('is-occupied-by-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if location is occupied by user' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Location is occupied by user' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "locationIsOccupiedByUser", null);
__decorate([
    (0, common_1.Post)('add-notation'),
    (0, swagger_1.ApiOperation)({ summary: 'Add location notation' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Location notation added' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "addLocationNotation", null);
__decorate([
    (0, common_1.Post)('get-notation'),
    (0, swagger_1.ApiOperation)({ summary: 'Get location notation' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Location notation' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getNotationLocation", null);
__decorate([
    (0, common_1.Post)('is-occupied'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if location is occupied' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Location is occupied' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "locationIsOccupied", null);
__decorate([
    (0, common_1.Post)('add-message'),
    (0, swagger_1.ApiOperation)({ summary: 'Add message to location occupation' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Message added' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "addMessageByLocationOccupationId", null);
__decorate([
    (0, common_1.Post)('get-messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Get messages by location occupation id' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Messages' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getMessagesByLocationOccupationId", null);
__decorate([
    (0, common_1.Post)('get-location-occupation'),
    (0, swagger_1.ApiOperation)({ summary: 'Get location occupation by user' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Location occupation' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocationOccupationByUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update location' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Location updated' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, location_model_1.LocationModel]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete location' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Location deleted' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "deleteLocation", null);
__decorate([
    (0, common_1.Patch)('occupation'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete location occupation' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Location occupation deleted' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "deleteLocationOccupation", null);
exports.LocationController = LocationController = __decorate([
    (0, common_1.Controller)({ path: 'location' }),
    (0, swagger_1.ApiTags)('Location'),
    __metadata("design:paramtypes", [])
], LocationController);
//# sourceMappingURL=location.controller.js.map