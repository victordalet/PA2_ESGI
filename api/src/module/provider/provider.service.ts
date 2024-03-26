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
        if(!(typeof provider.name === 'string')){
            throw new Error('Bad name');}
        else if(!(typeof provider.description === 'string')){
            throw new Error('Bad description');}
        
        else
        return await this.providerRepository.createProvider(provider);
    }

    async updateProvider(id: number, provider: ProviderModel) {
        if(!(typeof provider.name === 'string')){
            throw new Error('Bad name');}
        else if(!(typeof provider.description === 'string')){
            throw new Error('Bad description');}
         else if(!(typeof id === 'number')){
                throw new Error('Bad id');}

        else
        return await this.providerRepository.updateProvider(id, provider);
    }

    async deleteProvider(id: number) {
        if(!(typeof id === 'number')){
            throw new Error('Bad id');}

        else
        return await this.providerRepository.deleteProvider(id);
    }


}