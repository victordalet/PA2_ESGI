import {ProviderRepository} from "./provider.repository";
import {Provider} from "../../core/provider";
import {ProviderModel} from "./provider.model";

export class ProviderService {
    private readonly providerRepository: ProviderRepository;

    constructor() {
        this.providerRepository = new ProviderRepository();
    }

    async getProviders(): Promise<Provider[]> {
        return await this.providerRepository.getProviders();
    }

    async createProvider(provider: ProviderModel) {
        return await this.providerRepository.createProvider(provider);
    }

    async updateProvider(id: number, provider: ProviderModel) {
        return await this.providerRepository.updateProvider(id, provider);
    }

    async deleteProvider(id: number) {
        return await this.providerRepository.deleteProvider(id);
    }


}