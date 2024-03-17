import {Location, LocationAvailability} from "../../core/location";
import {LocationRepository} from "./location.repository";
import * as NodeGeocoder from 'node-geocoder';
import node_geocoder from 'node-geocoder';

export class LocationService {

    private LocationRepository: LocationRepository;

    constructor() {
        this.LocationRepository = new LocationRepository();
    }

    async getLocations() {
        return await this.LocationRepository.getLocations();
    }

    async createLocation(location: Location) {
        const options: NodeGeocoder.Options = {
            provider: 'openstreetmap',
        };
        const geocoder = node_geocoder(options);
        const res = await geocoder.geocode(location.address);
        location.latitude = res[0].latitude;
        location.longitude = res[0].longitude;
        return await this.LocationRepository.createLocation(location);
    }

    async updateLocation(id: number, location: Location) {
        return await this.LocationRepository.updateLocation(id, location);
    }

    async deleteLocation(id: number) {
        return await this.LocationRepository.deleteLocation(id);
    }

    async locationIsOccupied(body: LocationAvailability) {
        return await this.LocationRepository.locationIsOccupied(body.location_id, body.from_datetime, body.to_datetime);
    }

    async addLocationOccupation(body: LocationAvailability, token: string) {
        const response = await this.LocationRepository.addLocationOccupation(body.location_id, token, body.from_datetime, body.to_datetime);
        return {id: response}
    }

    async locationIsOccupiedByUser(locationId: number, token: string) {
        return {is_occupied: await this.LocationRepository.locationIsOccupiedByUser(locationId, token)};
    }

    async getLocationOccupation(locationId: number) {
        return await this.LocationRepository.getLocationOccupation(locationId);
    }

    async addLocationNotation(locationId: number, notation: number) {
        return await this.LocationRepository.addNotationLocation(locationId, notation);
    }

    async getNotationLocation(locationId: number) {
        const rows = await this.LocationRepository.getNotationLocation(locationId);
        if (rows instanceof Array) {
            return rows.map((row: any) => row.notation).reduce((a: number, b: number) => a + b, 0) / rows.length;
        }
    }

    async getMessagesByLocationOccupationId(locationOccupationId: number) {
        return await this.LocationRepository.getMessagesByLocationOccupationId(locationOccupationId);
    }

    async addMessageByLocationOccupationId(locationOccupationId: number, message: string, token: string) {
        return await this.LocationRepository.addMessageToLocationOccupation(locationOccupationId, message, token);
    }

    async deleteLocationOccupation(locationId: number) {
        return await this.LocationRepository.deleteLocationOccupation(locationId);
    }

    async getLocationOccupationByUser(token: string) {
        return await this.LocationRepository.getLocationOccupationByUser(token);
    }

    async getLocationByEmail(token: string) {
        return await this.LocationRepository.getLocationByEmail(token);
    }
}