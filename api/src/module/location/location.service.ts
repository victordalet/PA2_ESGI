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
        if(!(typeof location.name === 'string')){
            throw new Error('Bad name'); 
           } 
           else if(!(typeof location.description === 'string')){
            throw new Error('Bad description');
           } 
            else if(!(typeof location.address === 'string')){
            throw new Error('Bad address');
           } 
           else if(!(typeof location.latitude === 'number')){
            throw new Error('Bad latitude');
           } 
           else if(!(typeof location.longitude === 'number')){
            throw new Error('Bad longitude'); 
           }
            else if(!(typeof location.capacity === 'number')){
            throw new Error('Bad capacity'); 
           }
            else if(!(typeof location.price === 'number')){
            throw new Error('Bad price'); 
           } 
           else if(!(typeof location.type === 'string')){
            throw new Error('Bad type'); 
           }
            else if(!(typeof location.created_by === 'string')){
            throw new Error('Error'); 
           }
       
        else{
        const options: NodeGeocoder.Options = {
            provider: 'openstreetmap',
        };
        const geocoder = node_geocoder(options);
        const res = await geocoder.geocode(location.address);
        location.latitude = res[0].latitude;
        location.longitude = res[0].longitude;
        return await this.LocationRepository.createLocation(location);
    }
    }

    async updateLocation(id: number, location: Location) {
        if(!(typeof location.name === 'string')){
            throw new Error('Bad name'); 
           }
            else if(!(typeof location.description === 'string')){
            throw new Error('Bad description');
           }  
           else if(!(typeof location.address === 'string')){
            throw new Error('Bad address');
           } 
           else if(!(typeof location.latitude === 'number')){
            throw new Error('Bad latitude');
           } 
           else if(!(typeof location.longitude === 'number')){
            throw new Error('Bad longitude'); 
           } 
           else if(!(typeof location.capacity === 'number')){
            throw new Error('Bad capacity'); 
           } 
           else if(!(typeof location.price === 'number')){
            throw new Error('Bad price'); 
           } 
           else if(!(typeof location.type === 'string')){
            throw new Error('Bad type'); 
           } 
           else if(!(typeof id === 'number')){
            throw new Error('Bad id'); 
           } 

        else
        return await this.LocationRepository.updateLocation(id, location);
    }

    async deleteLocation(id: number, token: string) {
        if(!(typeof id === 'number')){
          throw new Error('Bad id'); 
         } 

        else
          return await this.LocationRepository.deleteLocation(id, token);

    }

    async locationIsOccupied(body: LocationAvailability) { 
        if(!(typeof body.location_id === 'number')){
            throw new Error('Bad id'); 
           } 
        else
        return await this.LocationRepository.locationIsOccupied(body.location_id, body.from_datetime, body.to_datetime);
    }
 
    async addLocationOccupation(body: LocationAvailability, token: string) {
        if(!(typeof body.location_id === 'number')){
            throw new Error('Bad id'); 
           } 
        else 
       { const response = await this.LocationRepository.addLocationOccupation(body.location_id, token, body.from_datetime, body.to_datetime);
        return {id: response}}
    }

    async locationIsOccupiedByUser(locationId: number, token: string) {
        if(!(typeof locationId === 'number')){
            throw new Error('Bad id'); 
           } 
        else 
        return {is_occupied: await this.LocationRepository.locationIsOccupiedByUser(locationId, token)};
    }

    async getLocationOccupation(locationId: number) {
        return await this.LocationRepository.getLocationOccupation(locationId);
    }

    async addLocationNotation(locationId: number, notation: number, token: string) {
          if(!(typeof notation === 'number')){
            throw new Error('Bad notation'); 
           } 
        else if(!(typeof locationId === 'number')){
            throw new Error('Bad locationId');
           } 
        else
        return await this.LocationRepository.addNotationLocation(locationId, notation, token);
    }

    async getNotationLocation(locationId: number) {
        const rows = await this.LocationRepository.getNotationLocation(locationId);
        if (rows instanceof Array) {
            return rows.map((row: any) => row.notation).reduce((a: number, b: number) => a + b, 0) / rows.length;
        }
    }

    async getMessagesByLocationOccupationId(locationOccupationId: number, token: string) {
        return await this.LocationRepository.getMessagesByLocationOccupationId(locationOccupationId,token);
    }

    async addMessageByLocationOccupationId(locationOccupationId: number, message: string, token: string) {
        if(!(typeof message === 'string')){
            throw new Error('Bad message'); 
           } 
        else if(!(typeof locationOccupationId === 'number')){
            throw new Error('Bad locationOccupationId');
           } 
        else
        return await this.LocationRepository.addMessageToLocationOccupation(locationOccupationId, message, token);
    }

    async deleteLocationOccupation(locationId: number, token: string) {
        if(!(typeof locationId === 'number')){
          throw new Error('Bad locationId'); 
         } 
        else 
        return await this.LocationRepository.deleteLocationOccupation(locationId, token);
    }

    async getLocationOccupationByUser(token: string) {
        return await this.LocationRepository.getLocationOccupationByUser(token);
    }

    async getLocationByEmail(token: string) {
        return await this.LocationRepository.getLocationByEmail(token);
    }

    async deleteLocationByAdmin(locationId: number) {
        return await this.LocationRepository.deleteLocationByAdmin(locationId);
    }
}