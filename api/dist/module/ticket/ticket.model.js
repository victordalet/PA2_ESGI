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
exports.BodyTicket = exports.BodyTicketMessage = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BodyTicketMessage {
}
exports.BodyTicketMessage = BodyTicketMessage;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Ticket id' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BodyTicketMessage.prototype, "ticket_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'created_by', description: 'Created by' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyTicketMessage.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Message', description: 'Message' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyTicketMessage.prototype, "message", void 0);
class BodyTicket {
}
exports.BodyTicket = BodyTicket;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ticket name', description: 'Name of ticket' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyTicket.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ticket description', description: 'Description of ticket' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyTicket.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'open', description: 'Status of ticket' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyTicket.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'occupy_by', description: 'Occupy by' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyTicket.prototype, "occupy_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'created_by', description: 'Created by' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BodyTicket.prototype, "created_by", void 0);
//# sourceMappingURL=ticket.model.js.map