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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const message_service_1 = require("./message.service");
const message_model_1 = require("./message.model");
const token_validation_1 = require("../../validation/token/token.validation");
let MessageController = class MessageController {
    constructor() {
        this.messageService = new message_service_1.MessageService();
        this.tokenValidation = new token_validation_1.TokenValidation();
    }
    async getMessages(token) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.getMessages();
    }
    async getMessageByMail(token, email) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.getMessagesByEmailFrom(email);
    }
    async getMessageByMailTo(token, email) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.getMessagesByEmailTo(email);
    }
    async createMessage(token, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.createMessage(body);
    }
    async updateMessage(token, id, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.updateMessage(id, body);
    }
    async deleteMessage(token, id) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.deleteMessage(id);
    }
    async getIllegibleMessages(token) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.getIllegibleMessages();
    }
    async addIllegibleWord(token, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.addIllegibleWord(body.word);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple messages' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of messages' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('mail_from'),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple messages' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of messages' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessageByMail", null);
__decorate([
    (0, common_1.Get)('mail_to'),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple messages' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of messages' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessageByMailTo", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create message' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Message created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, message_model_1.BodyMessage]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update message' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Message updated' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, message_model_1.BodyMessage]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete message' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Message deleted' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "deleteMessage", null);
__decorate([
    (0, common_1.Get)('illegible'),
    (0, swagger_1.ApiOperation)({ summary: 'Get illegible messages' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of messages' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getIllegibleMessages", null);
__decorate([
    (0, common_1.Post)('illegible'),
    (0, swagger_1.ApiOperation)({ summary: 'Add illegible word' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Word added' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request body is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "addIllegibleWord", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)({ path: 'message' }),
    (0, swagger_1.ApiTags)('Message'),
    __metadata("design:paramtypes", [])
], MessageController);
//# sourceMappingURL=message.controller.js.map