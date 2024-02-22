import {Location} from "../../core/location";
import {LocationRepository} from "./location.repository";

export class LocationService {

    private LocationRepository: LocationRepository;

    constructor() {
        this.LocationRepository = new LocationRepository();
    }

    async getLocations() {
        return await this.LocationRepository.getLocations();
    }

    async createLocation(location: Location) {
        return await this.LocationRepository.createLocation(location);
    }

    async updateLocation(id: number, location: Location) {
        return await this.LocationRepository.updateLocation(id, location);
    }

    async deleteLocation(id: number) {
        return await this.LocationRepository.deleteLocation(id);
    }
}