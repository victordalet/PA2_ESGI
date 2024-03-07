import {ServiceRepository} from "./service.repository";
import {Service} from "../../core/service";
import {ServiceModel} from "./service.model";

export class ServiceService {
    private serviceRepository: ServiceRepository;

    constructor() {
        this.serviceRepository = new ServiceRepository();
    }

    async getServices(): Promise<Service[]> {
        return this.serviceRepository.getServices();
    }

    async createService(service: ServiceModel) {
        return this.serviceRepository.createService(service);
    }

    async updateService(id: number, service: ServiceModel) {
        return this.serviceRepository.updateService(id, service);
    }

    async deleteService(id: number) {
        return this.serviceRepository.deleteService(id);
    }

    async getServiceByEmail(token: string) {
        return this.serviceRepository.getServiceByEmail(token);
    }
}