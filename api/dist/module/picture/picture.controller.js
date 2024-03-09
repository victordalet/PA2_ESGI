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
exports.PictureController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const picture_model_1 = require("./picture.model");
const token_validation_1 = require("../../validation/token/token.validation");
const picture_service_1 = require("./picture.service");
const platform_express_1 = require("@nestjs/platform-express");
let PictureController = class PictureController {
    constructor() {
        this.pictureService = new picture_service_1.PictureService();
        this.tokenValidation = new token_validation_1.TokenValidation();
    }
    async getPicture(token, body) {
        await this.tokenValidation.validateToken(token);
        return this.pictureService.getPicture(body);
    }
    async uploadPicture(token, body, file) {
        await this.tokenValidation.validateBailToken(token);
        return this.pictureService.uploadPicture(body, file);
    }
};
exports.PictureController = PictureController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get one picture' }),
    (0, swagger_1.ApiOkResponse)({ description: 'base 63 picture' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, picture_model_1.PictureModel]),
    __metadata("design:returntype", Promise)
], PictureController.prototype, "getPicture", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Post one picture' }),
    (0, swagger_1.ApiOperation)({ description: '' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Request param is not valid' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, picture_model_1.PictureModel, Object]),
    __metadata("design:returntype", Promise)
], PictureController.prototype, "uploadPicture", null);
exports.PictureController = PictureController = __decorate([
    (0, common_1.Controller)({ path: 'picture' }),
    (0, swagger_1.ApiTags)('Picture'),
    __metadata("design:paramtypes", [])
], PictureController);
//# sourceMappingURL=picture.controller.js.map