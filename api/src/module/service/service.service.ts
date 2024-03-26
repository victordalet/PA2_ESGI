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
        if(!(typeof service.name === 'string')){
            throw new Error('Bad name');}

        else if(!(typeof service.description === 'string')){
            throw new Error('Bad description');}

        else if(!(typeof service.price === 'number')){
            throw new Error('Bad price');}

        else if(!(typeof service.duration === 'number')){
            throw new Error('Bad duration');}

         else if(!(typeof service.created_by === 'string')){
            throw new Error('Error');}
        else if(!(typeof service.type === 'string')){
                throw new Error('Bad type');}

    else
        return this.serviceRepository.createService(service);
    }

    async updateService(id: number, service: ServiceModel) {
        if(!(typeof service.name === 'string')){
            throw new Error('Bad name');}

        else if(!(typeof service.description === 'string')){
            throw new Error('Bad description');}

        else if(!(typeof id === 'number')){
            throw new Error('Bad id');}
        
        else
        return this.serviceRepository.updateService(id, service);
    }

    async deleteService(id: number) {
        if(!(typeof id === 'number')){
            throw new Error('Bad id');}
        
        else
        return this.serviceRepository.deleteService(id);
    }

    async getServiceByEmail(token: string) {
        return this.serviceRepository.getServiceByEmail(token);
    }

    async postServiceByUser(token: string, body: LocationLiaison) {
        if(!(typeof body.location_occupation_id === 'number')){
            throw new Error('Bad location_occupation_id');}
        
        else if(!(typeof  body.service_id === 'number')){
            throw new Error('Bad  service_id');}
        
        else
        return this.serviceRepository.postServiceByUser(body);
    }

    async postServiceByLocation(body: LocationLiaison) {
        if(!(typeof body.location_occupation_id === 'number')){
            throw new Error('Bad location_occupation_id');}
        
        else if(!(typeof  body.service_id === 'number')){
            throw new Error('Bad  service_id');}
        
        else
        return this.serviceRepository.postServiceByLocation(body);
    }

    async getServiceByLocation(body: LocationLiaison) {
        return this.serviceRepository.getServiceByLocation(body);
    }

    async getServiceByUser(body: LocationLiaison) {
        return this.serviceRepository.getServiceByUser(body);
    }

    async notationService(body: ServiceModel) {
        if(!(typeof body.notation=== 'number')){ 
            throw new Error('Bad notation');}
        
        else if(!(typeof  body.service_id === 'number')){
            throw new Error('Bad  service_id');}
        
        else
        if (body.type === 'USER') {
            return this.serviceRepository.notationServiceByUser(body);
        } else if (body.type === 'BAIL') {
            return this.serviceRepository.notationServiceByLocation(body);
        }
    }

}