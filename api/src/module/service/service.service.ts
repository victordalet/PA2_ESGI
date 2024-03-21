import {ServiceRepository} from "./service.repository";
import {Service} from "../../core/service";
import {ServiceModel} from "./service.model";
import {LocationLiaison} from "../../core/location";

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

    async postServiceByUser(token: string, body: LocationLiaison) {
        return this.serviceRepository.postServiceByUser(body);
    }

    async postServiceByLocation(body: LocationLiaison) {
        return this.serviceRepository.postServiceByLocation(body);
    }

    async getServiceByLocation(body: LocationLiaison) {
        return this.serviceRepository.getServiceByLocation(body);
    }

    async getServiceByUser(body: LocationLiaison) {
        return this.serviceRepository.getServiceByUser(body);
    }

    async notationService(body: ServiceModel) {
        if (body.type === 'USER') {
            return this.serviceRepository.notationServiceByUser(body);
        } else if (body.type === 'BAIL') {
            return this.serviceRepository.notationServiceByLocation(body);
        }
    }

}