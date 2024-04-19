import {Location, LocationAvailability} from "../../core/location";
import {LocationRepository} from "./location.repository";
import * as NodeGeocoder from 'node-geocoder';
import node_geocoder from 'node-geocoder';
import {Stripe} from "stripe";

export class LocationService {

    private locationRepository: LocationRepository;

    constructor() {
        this.locationRepository = new LocationRepository();
    }

    async getLocations() {
        return await this.locationRepository.getLocations();
    }

    async createLocation(location: Location) {
        if (!(typeof location.name === 'string')) {
            throw new Error('Bad name');
        } else if (!(typeof location.description === 'string')) {
            throw new Error('Bad description');
        } else if (!(typeof location.address === 'string')) {
            throw new Error('Bad address');
        } else if (!(typeof location.latitude === 'number')) {
            throw new Error('Bad latitude');
        } else if (!(typeof location.longitude === 'number')) {
            throw new Error('Bad longitude');
        } else if (!(typeof location.capacity === 'number')) {
            throw new Error('Bad capacity');
        } else if (!(typeof location.price === 'number')) {
            throw new Error('Bad price');
        } else if (!(typeof location.type === 'string')) {
            throw new Error('Bad type');
        } else if (!(typeof location.created_by === 'string')) {
            throw new Error('Error');
        } else {
            const options: NodeGeocoder.Options = {
                provider: 'openstreetmap',
            };
            const geocoder = node_geocoder(options);
            const res = await geocoder.geocode(location.address);
            location.latitude = res[0].latitude;
            location.longitude = res[0].longitude;
            return await this.locationRepository.createLocation(location);
        }
    }

    async updateLocation(id: number, location: Location) {
        if (!(typeof location.name === 'string')) {
            throw new Error('Bad name');
        } else if (!(typeof location.description === 'string')) {
            throw new Error('Bad description');
        } else if (!(typeof location.address === 'string')) {
            throw new Error('Bad address');
        } else if (!(typeof location.latitude === 'number')) {
            throw new Error('Bad latitude');
        } else if (!(typeof location.longitude === 'number')) {
            throw new Error('Bad longitude');
        } else if (!(typeof location.capacity === 'number')) {
            throw new Error('Bad capacity');
        } else if (!(typeof location.price === 'number')) {
            throw new Error('Bad price');
        } else if (!(typeof location.type === 'string')) {
            throw new Error('Bad type');
        } else if (!(typeof id === 'number')) {
            throw new Error('Bad id');
        } else
            return await this.locationRepository.updateLocation(id, location);
    }

    async deleteLocation(id: number, token: string) {
        if (!(typeof id === 'number')) {
            throw new Error('Bad id');
        } else
            return await this.locationRepository.deleteLocation(id, token);

    }

    async locationIsOccupied(body: LocationAvailability) {
        if (!(typeof body.location_id === 'number')) {
            throw new Error('Bad id');
        } else {
            const rows = await this.locationRepository.locationIsOccupied(body.location_id);
            if (rows instanceof Array) {
                for (let i = 0; i < rows.length; i++) {
                    const row: any = rows[i];
                    if (row.repeat === 'none') {
                        if (row.from_datetime <= body.from_datetime && row.to_datetime >= body.to_datetime) {
                            return true;
                        }
                    } else if (row.repeat === 'daily') {
                        const from = new Date(body.from_datetime);
                        const to = new Date(body.from_datetime);
                        const from2 = new Date(row.from_datetime);
                        const to2 = new Date(row.to_datetime);
                        while (from <= to) {
                            if (from2 <= from && to2 >= from) {
                                return true;
                            }
                            from.setDate(from.getDate() + 1);
                        }
                    } else if (row.repeat === 'weakly') {
                        const from = new Date(body.from_datetime);
                        const to = new Date(body.from_datetime);
                        const from2 = new Date(row.from_datetime);
                        const to2 = new Date(row.to_datetime);
                        while (from <= to) {
                            if (from2 <= from && to2 >= from) {
                                return true;
                            }
                            from.setDate(from.getDate() + 7);
                        }
                    } else if (row.repeat === 'monthly') {
                        const from = new Date(body.from_datetime);
                        const to = new Date(body.from_datetime);
                        const from2 = new Date(row.from_datetime);
                        const to2 = new Date(row.to_datetime);
                        while (from <= to) {
                            if (from2 <= from && to2 >= from) {
                                return true;
                            }
                            from.setMonth(from.getMonth() + 1);
                        }

                    }

                }
                return false;
            }
        }
    }

    async addLocationOccupation(body: LocationAvailability, token: string) {
        if (!(typeof body.location_id === 'number')) {
            throw new Error('Bad id');
        } else {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Premium',
                            },
                            unit_amount: body.price * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL}/premium`,
                cancel_url: `${process.env.FRONTEND_URL}/home`,
            });
            const response = await this.locationRepository.addLocationOccupation(body.location_id, token, body.from_datetime, body.to_datetime);
            return {id: response, url: session.url};
        }
    }

    async locationIsOccupiedByUser(locationId: number, token: string) {
        if (!(typeof locationId === 'number')) {
            throw new Error('Bad id');
        } else
            return {is_occupied: await this.locationRepository.locationIsOccupiedByUser(locationId, token)};
    }

    async getLocationOccupation(locationId: number) {
        return await this.locationRepository.getLocationOccupation(locationId);
    }

    async addLocationNotation(locationId: number, notation: number, token: string) {
        if (!(typeof notation === 'number')) {
            throw new Error('Bad notation');
        } else if (!(typeof locationId === 'number')) {
            throw new Error('Bad locationId');
        } else
            return await this.locationRepository.addNotationLocation(locationId, notation, token);
    }

    async addLocationOccupationByBail(body: LocationAvailability, token: string) {
        if (!(typeof body.location_id === 'number')) {
            throw new Error('Bad id');
        } else {
            const repeat = body.repeat;
            return await this.locationRepository.addLocationOccupationByBail(body.location_id, token, body.from_datetime, body.to_datetime, repeat.toString());
        }
    }

    async getNotationLocation(locationId: number) {
        const rows = await this.locationRepository.getNotationLocation(locationId);
        if (rows instanceof Array) {
            return rows.map((row: any) => row.notation).reduce((a: number, b: number) => a + b, 0) / rows.length;
        }
    }

    async getMessagesByLocationOccupationId(locationOccupationId: number, token: string) {
        return await this.locationRepository.getMessagesByLocationOccupationId(locationOccupationId, token);
    }

    async addMessageByLocationOccupationId(locationOccupationId: number, message: string, token: string) {
        if (!(typeof message === 'string')) {
            throw new Error('Bad message');
        } else if (!(typeof locationOccupationId === 'number')) {
            throw new Error('Bad locationOccupationId');
        } else
            return await this.locationRepository.addMessageToLocationOccupation(locationOccupationId, message, token);
    }

    async deleteLocationOccupation(locationId: number, token: string) {
        return await this.locationRepository.deleteLocationOccupation(locationId, token);
    }

    async getLocationOccupationByUser(token: string) {
        return await this.locationRepository.getLocationOccupationByUser(token);
    }

    async getLocationByEmail(token: string) {
        return await this.locationRepository.getLocationByEmail(token);
    }

    async deleteLocationByAdmin(locationId: number) {
        return await this.locationRepository.deleteLocationByAdmin(locationId);
    }
}