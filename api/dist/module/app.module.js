"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const ticket_module_1 = require("./ticket/ticket.module");
const message_module_1 = require("./message/message.module");
const subscription_module_1 = require("./subscription/subscription.module");
const location_module_1 = require("./location/location.module");
const facture_module_1 = require("./facture/facture.module");
const service_module_1 = require("./service/service.module");
const provider_module_1 = require("./provider/provider.module");
const language_module_1 = require("./language/language.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            ticket_module_1.TicketModule,
            message_module_1.MessageModule,
            subscription_module_1.SubscriptionModule,
            location_module_1.LocationModule,
            facture_module_1.FactureModule,
            service_module_1.ServiceModule,
            provider_module_1.ProviderModule,
            language_module_1.LanguageModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map