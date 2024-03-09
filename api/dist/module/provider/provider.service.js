"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const provider_repository_1 = require("./provider.repository");
class ProviderService {
    constructor() {
        this.providerRepository = new provider_repository_1.ProviderRepository();
    }
    async getProviders() {
        return await this.providerRepository.getProviders();
    }
    async createProvider(provider) {
        return await this.providerRepository.createProvider(provider);
    }
    async updateProvider(id, provider) {
        return await this.providerRepository.updateProvider(id, provider);
    }
    async deleteProvider(id) {
        return await this.providerRepository.deleteProvider(id);
    }
}
exports.ProviderService = ProviderService;
//# sourceMappingURL=provider.service.js.map