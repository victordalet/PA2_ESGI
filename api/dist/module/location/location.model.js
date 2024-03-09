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
exports.LocationModel = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class LocationModel {
}
exports.LocationModel = LocationModel;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', description: 'Location id' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LocationModel.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', description: 'Location name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationModel.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', description: 'Location picture' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationModel.prototype, "picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', description: 'Location description' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationModel.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'boolean', description: 'Location accepted' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LocationModel.prototype, "accepted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', description: 'Location address' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationModel.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', description: 'Location latitude' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LocationModel.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', description: 'Location longitude' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LocationModel.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', description: 'Location capacity' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LocationModel.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', description: 'Location price' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LocationModel.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', description: 'Location type' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocationModel.prototype, "type", void 0);
//# sourceMappingURL=location.model.js.map