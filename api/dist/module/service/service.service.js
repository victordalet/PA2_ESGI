"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const service_repository_1 = require("./service.repository");
class ServiceService {
    constructor() {
        this.serviceRepository = new service_repository_1.ServiceRepository();
    }
    async getServices() {
        return this.serviceRepository.getServices();
    }
    async createService(service) {
        return this.serviceRepository.createService(service);
    }
    async updateService(id, service) {
        return this.serviceRepository.updateService(id, service);
    }
    async deleteService(id) {
        return this.serviceRepository.deleteService(id);
    }
    async getServiceByEmail(token) {
        return this.serviceRepository.getServiceByEmail(token);
    }
    async postServiceByUser(token, body) {
        return this.serviceRepository.postServiceByUser(body);
    }
    async postServiceByLocation(body) {
        return this.serviceRepository.postServiceByLocation(body);
    }
    async getServiceByLocation(body) {
        return this.serviceRepository.getServiceByLocation(body);
    }
    async getServiceByUser(body) {
        return this.serviceRepository.getServiceByUser(body);
    }
}
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map