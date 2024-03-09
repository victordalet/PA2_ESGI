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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ticket_model_1 = require("./ticket.model");
const ticket_service_1 = require("./ticket.service");
const token_validation_1 = require("../../validation/token/token.validation");
let TicketController = class TicketController {
    constructor() {
        this.ticketService = new ticket_service_1.TicketService();
        this.tokenValidation = new token_validation_1.TokenValidation();
    }
    async getTickets(token) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.getTickets();
    }
    async createTicket(token, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.createTicket(body);
    }
    async updateTicket(token, id, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.updateTicket(id, body);
    }
    async deleteTicket(token, id) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.deleteTicket(id);
    }
    async createMessageTicket(token, id, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.createMessageTicket(id, body);
    }
    async getMessageTickets(token, id) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.getMessageTickets(id);
    }
    async updateMessageTicket(token, id, messageId, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.updateMessageTicket(id, messageId, body);
    }
    async deleteMessageTicket(token, id, messageId) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.deleteMessageTicket(id, messageId);
    }
};
exports.TicketController = TicketController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple tickets' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of tickets' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getTickets", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create ticket' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Ticket created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ticket_model_1.BodyTicket]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update ticket' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Ticket updated' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, ticket_model_1.BodyTicket]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "updateTicket", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete ticket' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Ticket deleted' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "deleteTicket", null);
__decorate([
    (0, common_1.Post)(':id/message'),
    (0, swagger_1.ApiOperation)({ summary: 'Create message ticket' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Message ticket created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, ticket_model_1.BodyTicketMessage]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "createMessageTicket", null);
__decorate([
    (0, common_1.Get)(':id/message'),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple message tickets' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of message tickets' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getMessageTickets", null);
__decorate([
    (0, common_1.Put)(':id/message/:messageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update message ticket' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Message ticket updated' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('messageId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, ticket_model_1.BodyTicketMessage]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "updateMessageTicket", null);
__decorate([
    (0, common_1.Delete)(':id/message/:messageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete message ticket' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Message ticket deleted' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('messageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "deleteMessageTicket", null);
exports.TicketController = TicketController = __decorate([
    (0, common_1.Controller)({ path: 'ticket' }),
    (0, swagger_1.ApiTags)('Ticket'),
    __metadata("design:paramtypes", [])
], TicketController);
//# sourceMappingURL=ticket.controller.js.map