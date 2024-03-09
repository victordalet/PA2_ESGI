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
exports.FactureModel = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FactureModel {
}
exports.FactureModel = FactureModel;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', description: 'Facture by' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FactureModel.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', description: 'Facture name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FactureModel.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', description: 'Facture description' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FactureModel.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', description: 'Facture price' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FactureModel.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', description: 'Facture duration' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FactureModel.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', description: 'Facture type' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FactureModel.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', description: 'Facture notation' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FactureModel.prototype, "notification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', description: 'Facture notification interval' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FactureModel.prototype, "notification_interval", void 0);
//# sourceMappingURL=facture.model.js.map