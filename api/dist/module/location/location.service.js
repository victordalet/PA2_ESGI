"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const location_repository_1 = require("./location.repository");
class LocationService {
    constructor() {
        this.LocationRepository = new location_repository_1.LocationRepository();
    }
    async getLocations() {
        return await this.LocationRepository.getLocations();
    }
    async createLocation(location) {
        return await this.LocationRepository.createLocation(location);
    }
    async updateLocation(id, location) {
        return await this.LocationRepository.updateLocation(id, location);
    }
    async deleteLocation(id) {
        return await this.LocationRepository.deleteLocation(id);
    }
    async locationIsOccupied(body) {
        return await this.LocationRepository.locationIsOccupied(body.location_id, body.from_datetime, body.to_datetime);
    }
    async addLocationOccupation(body, token) {
        const response = await this.LocationRepository.addLocationOccupation(body.location_id, token, body.from_datetime, body.to_datetime);
        return { id: response };
    }
    async locationIsOccupiedByUser(locationId, token) {
        return { is_occupied: await this.LocationRepository.locationIsOccupiedByUser(locationId, token) };
    }
    async addLocationNotation(locationId, notation) {
        return await this.LocationRepository.addNotationLocation(locationId, notation);
    }
    async getNotationLocation(locationId) {
        const rows = await this.LocationRepository.getNotationLocation(locationId);
        if (rows instanceof Array) {
            return rows.map((row) => row.notation).reduce((a, b) => a + b, 0) / rows.length;
        }
    }
    async getMessagesByLocationOccupationId(locationOccupationId) {
        return await this.LocationRepository.getMessagesByLocationOccupationId(locationOccupationId);
    }
    async addMessageByLocationOccupationId(locationOccupationId, message) {
        return await this.LocationRepository.addMessageToLocationOccupation(locationOccupationId, message);
    }
    async deleteLocationOccupation(locationId) {
        return await this.LocationRepository.deleteLocationOccupation(locationId);
    }
    async getLocationOccupationByUser(token) {
        return await this.LocationRepository.getLocationOccupationByUser(token);
    }
    async getLocationByEmail(token) {
        return await this.LocationRepository.getLocationByEmail(token);
    }
}
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map