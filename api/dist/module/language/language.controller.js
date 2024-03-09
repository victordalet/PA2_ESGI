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
exports.LanguageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const language_service_1 = require("./language.service");
const token_validation_1 = require("../../validation/token/token.validation");
let LanguageController = class LanguageController {
    constructor() {
        this.languageService = new language_service_1.LanguageService();
        this.tokenValidation = new token_validation_1.TokenValidation();
    }
    async getLanguageName() {
        return this.languageService.getLanguageFileByName();
    }
    async getLanguageFileByName(token, body) {
        await this.tokenValidation.validateAdminToken(token);
        return this.languageService.postWord(body);
    }
};
exports.LanguageController = LanguageController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get language ' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Language ' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguageName", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get language file by name' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Language file' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguageFileByName", null);
exports.LanguageController = LanguageController = __decorate([
    (0, common_1.Controller)({ path: 'language' }),
    (0, swagger_1.ApiTags)('Language'),
    __metadata("design:paramtypes", [])
], LanguageController);
//# sourceMappingURL=language.controller.js.map