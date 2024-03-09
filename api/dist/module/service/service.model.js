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
exports.ServiceModel = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ServiceModel {
}
exports.ServiceModel = ServiceModel;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'service_name', description: 'Service name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceModel.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'service_description', description: 'Service description' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceModel.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Service price' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ServiceModel.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60, description: 'Service duration' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ServiceModel.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user_email', description: 'Service created by' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceModel.prototype, "created_by", void 0);
//# sourceMappingURL=service.model.js.map