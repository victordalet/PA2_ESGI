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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyMessage = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BodyMessage {
}
exports.BodyMessage = BodyMessage;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Message id' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BodyMessage.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mail_from', description: 'Mail from' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyMessage.prototype, "mail_from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mail_to', description: 'Mail to' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyMessage.prototype, "mail_to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'subject', description: 'Subject' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyMessage.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'created_at', description: 'Created at' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyMessage.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'updated_at', description: 'Updated at' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyMessage.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'deleted_at', description: 'Deleted at' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyMessage.prototype, "deleted_at", void 0);
//# sourceMappingURL=message.model.js.map