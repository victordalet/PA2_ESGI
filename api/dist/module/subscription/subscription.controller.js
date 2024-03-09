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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const subscription_model_1 = require("./subscription.model");
const subscription_service_1 = require("./subscription.service");
const token_validation_1 = require("../../validation/token/token.validation");
let SubscriptionController = class SubscriptionController {
    constructor() {
        this.subscriptionService = new subscription_service_1.SubscriptionService();
        this.tokenValidation = new token_validation_1.TokenValidation();
    }
    async getSubscriptions(token) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.getSubscriptions();
    }
    async createSubscription(token, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.createSubscription(body);
    }
    async subscribeUser(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.subscriptionService.subscribeUserByToken(token, body);
    }
    async updateSubscription(token, id, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.updateSubscription(id, body);
    }
    async deleteSubscription(token, id) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.deleteSubscription(id);
    }
    async unsubscribeUser(token) {
        await this.tokenValidation.validateToken(token);
        return this.subscriptionService.unsubscribeUserByToken(token);
    }
    async userIsSubscribed(token, email) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.userIsSubscribed(email);
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple subscriptions' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of subscriptions' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getSubscriptions", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create subscription' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Subscription created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subscription_model_1.BodySubscription]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createSubscription", null);
__decorate([
    (0, common_1.Post)('subscribe'),
    (0, swagger_1.ApiOperation)({ summary: 'Subscribe user' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'User subscribed' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subscription_model_1.BodySubscription]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "subscribeUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update subscription' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Subscription updated' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, subscription_model_1.BodySubscription]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateSubscription", null);
__decorate([
    (0, common_1.Delete)('/by_id/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete subscription' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Subscription deleted' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "deleteSubscription", null);
__decorate([
    (0, common_1.Delete)('unsubscribe'),
    (0, swagger_1.ApiOperation)({ summary: 'Unsubscribe user' }),
    (0, swagger_1.ApiOkResponse)({ description: 'User unsubscribed' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "unsubscribeUser", null);
__decorate([
    (0, common_1.Get)(':email'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user is subscribed' }),
    (0, swagger_1.ApiOkResponse)({ description: 'User is subscribed' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "userIsSubscribed", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.Controller)({ path: 'subscription' }),
    (0, swagger_1.ApiTags)('Subscription'),
    __metadata("design:paramtypes", [])
], SubscriptionController);
//# sourceMappingURL=subscription.controller.js.map