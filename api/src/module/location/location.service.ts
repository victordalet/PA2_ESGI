import {Location, LocationAvailability} from "../../core/location";
import {LocationRepository} from "./location.repository";
import {Stripe} from "stripe";
import {RequestLocationServiceModel} from "./location.model";
import {uid} from "uid";
import {Emailer} from "../../mail/mail.module";
import {SubscriptionRepository} from "../subscription/subscription.repository";

export class LocationService {

    private locationRepository: LocationRepository;
    private emailer: Emailer;
    private subRepository: SubscriptionRepository;

    constructor() {
        this.locationRepository = new LocationRepository();
        this.subRepository = new SubscriptionRepository();
        this.emailer = new Emailer();
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
            const response = await fetch(`https://nominatim.openstreetmap.org/search?addressdetails=1&q=${location.address.replace(" ", "+")}&format=json`)
            const data = await response.json();
            if (data.length === 0) {
                location.latitude = 0;
                location.longitude = 0;
            } else {
                location.longitude = data[0].lat;
                location.longitude = data[0].lon;
            }
            return await this.locationRepository.createLocation(location);
        }
    }

    async createLocationValidation(token: string) {
        return await this.locationRepository.validePaiement(token);
    }

    async locationPaiement(id: number) {
        const uidToken = uid(32);
        await this.locationRepository.paiementUID(uidToken, id);
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const sub = await this.subRepository.subscriptionPrice();
        const subPrice = sub[0].price;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Bailleur subcription',
                        },
                        unit_amount: subPrice * 100,
                        recurring: {interval: 'month'},
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `https://apipcs.c2smr.fr/location/create-location-validation:${uidToken}`,
            cancel_url: `${process.env.FRONTEND_URL}/home`,
        });
        return {url: session.url};
    }

    async locationOccupationPaiementValidation(token: string) {
        await this.locationRepository.locationOccupationPaiementValidation(token);
        return "Paiement validé, vous pouvez maintenant occuper la location.";
    }

    async locationOccupationPaiement(id: number, price: number) {
        const uidToken = uid(32);
        await this.locationRepository.locationOccupationPaiement(uidToken, id);
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Bailleur subcription',
                        },
                        unit_amount: price * 100,
                        recurring: {interval: 'month'},
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `https://apipcs.c2smr.fr/location/location-occupation-paiement-validation:${uidToken}`,
            cancel_url: `${process.env.FRONTEND_URL}/home`,
        });
        return {url: session.url};
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
            console.log(body);
            const response = await this.locationRepository.addLocationOccupation(body.location_id, token, body.from_datetime, body.to_datetime, body.description);
            await this.locationRepository.addMessageToLocationOccupation(response, 'Hi', token);
            return {id: response};
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

    async getLocationOccupationInfoByAdmin() {
        return await this.locationRepository.getLocationOccupationInfoByAdmin();
    }

    async addMessageByLocationOccupationId(locationOccupationId: number, message: string, token: string) {
        return await this.locationRepository.addMessageToLocationOccupation(locationOccupationId, message, token);
    }

    async deleteLocationOccupation(locationId: number, token: string) {
        return await this.locationRepository.deleteLocationOccupation(locationId, token);
    }

    async adminAcceptLocationOccupation(locationOccupationId: number) {
        return await this.locationRepository.adminAcceptLocationOccupation(locationOccupationId);
    }

    async getLocationOccupationByUser(token: string) {
        return await this.locationRepository.getLocationOccupationByUser(token);
    }

    async addLocationOccupationByService(body: RequestLocationServiceModel) {
        return await this.locationRepository.addLocationOccupationByService(body);
    }

    async getLocationOccupationByServiceRequest() {
        return await this.locationRepository.getLocationOccupationByService();
    }

    async getLocationByEmail(token: string) {
        return await this.locationRepository.getLocationByEmail(token);
    }

    async deleteLocationByAdmin(locationId: number) {
        return await this.locationRepository.deleteLocationByAdmin(locationId);
    }

    async removeLocationOccupation(locationOccupationId: number) {
        return await this.locationRepository.removeLocationOccupation(locationOccupationId);
    }

    async acceptLocationOccupation(locationOccupationId: number, from_datetime: string, to_datetime: string, state_place: string, email: string, name: string) {
        this.emailer.acceptLocationOccupation(email, from_datetime, to_datetime, name, state_place);
        return await this.locationRepository.acceptLocationOccupation(locationOccupationId, from_datetime, to_datetime, state_place);
    }

    async resetNewMessages(locationId: number) {
        return await this.locationRepository.resetNewMessages(locationId);
    }
}