import {ServiceRepository} from "./service.repository";
import {Service} from "../../core/service";
import {ServiceModel} from "./service.model";
import {LocationAvailability, LocationLiaison} from "../../core/location";

export class ServiceService {
    private serviceRepository: ServiceRepository;

    constructor() {
        this.serviceRepository = new ServiceRepository();
    }

    async getServices(): Promise<Service[]> {
        return this.serviceRepository.getServices();
    }

    async createService(service: ServiceModel) {
        if (!(typeof service.name === 'string')) {
            throw new Error('Bad name');
        } else if (!(typeof service.description === 'string')) {
            throw new Error('Bad description');
        } else if (!(typeof service.price === 'number')) {
            throw new Error('Bad price');
        } else if (!(typeof service.duration === 'number')) {
            throw new Error('Bad duration');
        } else if (!(typeof service.created_by === 'string')) {
            throw new Error('Error');
        } else if (!(typeof service.type === 'string')) {
            throw new Error('Bad type');
        } else
            return this.serviceRepository.createService(service);
    }

    async updateService(id: number, service: ServiceModel) {
        if (!(typeof service.name === 'string')) {
            throw new Error('Bad name');
        } else if (!(typeof service.description === 'string')) {
            throw new Error('Bad description');
        } else if (!(typeof id === 'number')) {
            throw new Error('Bad id');
        } else
            return this.serviceRepository.updateService(id, service);
    }

    async deleteService(id: number) {
        if (!(typeof id === 'number')) {
            throw new Error('Bad id');
        } else
            return this.serviceRepository.deleteService(id);
    }

    async getServiceByEmail(token: string) {
        return this.serviceRepository.getServiceByEmail(token);
    }

    async postServiceByUser(token: string, body: LocationLiaison) {
        if (!(typeof body.location_occupation_id === 'number')) {
            throw new Error('Bad location_occupation_id');
        } else if (!(typeof body.service_id === 'number')) {
            throw new Error('Bad  service_id');
        } else
            return this.serviceRepository.postServiceByUser(body);
    }

    async getServiceByUserV2(token: string, body: LocationLiaison) {
        return await this.serviceRepository.getServiceByUserV2(body);
    }

    async serviceIsHere(body: LocationLiaison) {
        return await this.serviceRepository.serviceIsHere(body);
    }

    async isYourServices(token: string, body: LocationAvailability) {
        const r = await this.serviceRepository.isYourServices(token, body);
        console.log(r);
        return {accept: r}
    }

    async postServiceByLocation(body: LocationLiaison) {
        if (!(typeof body.location_occupation_id === 'number')) {
            throw new Error('Bad location_occupation_id');
        } else if (!(typeof body.service_id === 'number')) {
            throw new Error('Bad  service_id');
        } else
            return this.serviceRepository.postServiceByLocation(body);
    }

    async getServiceByLocation(body: LocationLiaison) {
        return this.serviceRepository.getServiceByLocation(body);
    }

    async getServiceByUser(body: LocationLiaison) {
        return this.serviceRepository.getServiceByUser(body);
    }

    async notationService(body: ServiceModel, token: string) {
        if (!(typeof body.notation === 'number')) {
            throw new Error('Bad notation');
        } else if (!(typeof body.service_id === 'number')) {
            throw new Error('Bad  service_id');
        } else if (body.type === 'USER') {
            return this.serviceRepository.notationServiceByUser(body, token);
        } else if (body.type === 'BAIL') {
            return this.serviceRepository.notationServiceByLocation(body, token);
        }
    }

    async getLocationByServiceId(service: ServiceModel) {
        if (service.type === 'USER') {
            return await this.serviceRepository.getLocationByServiceIdClient(service.service_id);
        }
        if (service.type === 'BAIL') {
            return await this.serviceRepository.getLocationByServiceIdBail(service.service_id);
        }
    }

    async removeLocationByServiceId(service: ServiceModel, token: string) {
        if (service.type === 'USER') {
            return this.serviceRepository.removeLocationByServiceIdClient(service.service_id, service.location_id, token);
        }
        if (service.type === 'BAIL') {
            return this.serviceRepository.removeLocationByServiceIdBail(service.service_id, service.location_id, token);
        }
    }

    async adminAcceptService(service: ServiceModel) {
        return this.serviceRepository.adminAcceptService(service.service_id);
    }

    async deleteServiceByAdmin(id: number) {
        return this.serviceRepository.deleteServiceByAdmin(id);
    }


}