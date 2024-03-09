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
exports.UserBody = exports.GetEmailUser = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetEmailUser {
}
exports.GetEmailUser = GetEmailUser;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@gmail.com', description: 'email of user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetEmailUser.prototype, "email", void 0);
class UserBody {
}
exports.UserBody = UserBody;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@gmail.com', description: 'email of user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBody.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password', description: 'password_of_user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBody.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test', description: 'name of user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBody.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin', description: 'role of user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBody.prototype, "rules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2021-11-02T15:00:00Z', description: 'created_at' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBody.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2021-11-02T15:00:00Z', description: 'updated_at' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBody.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2021-11-02T15:00:00Z', description: 'deleted_at' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBody.prototype, "deleted_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'address', description: 'address of user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBody.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'connection', description: 'connection' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBody.prototype, "connection", void 0);
//# sourceMappingURL=user.model.js.map