import {ServiceRepository} from "./service.repository";
import {Service} from "../../core/service";
import {ServiceByServiceModel, ServiceModel} from "./service.model";
import {LocationAvailability, LocationLiaison} from "../../core/location";
import {uid} from "uid";
import {Emailer} from "../../mail/mail.module";
import {Stripe} from "stripe";

export class ServiceService {
    private serviceRepository: ServiceRepository;
    private emailer: Emailer;

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
        } else {
            const nfc = uid(60)
            return this.serviceRepository.createService(service, nfc);
        }
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
        const data = await this.serviceRepository.postServiceByUser(body);
        this.emailer.PrestateConfirmation(data.email, body.from_datetime, data.price, data.address);
    }

    async addServiceByService(token: string, body: ServiceByServiceModel) {
        return await this.serviceRepository.addServiceByService(token, body);
    }

    async getServiceByUserV2(token: string, body: LocationLiaison) {
        return await this.serviceRepository.getServiceByUserV2(body);
    }

    async serviceIsHere(body: LocationLiaison) {
        return await this.serviceRepository.serviceIsHere(body);
    }

    async isYourServices(token: string, body: LocationAvailability) {
        const r = await this.serviceRepository.isYourServices(token, body);
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

    async isFreeService(token: string): Promise<boolean> {
        return this.serviceRepository.isFreeService(token);
    }

    async isReductionService(price: number, token: string): Promise<number> {
        return this.serviceRepository.isReductionService(price, token);
    }

    async paidPresentation(service: ServiceModel, token: string) {
        const uidPayment = uid(60);
        await this.serviceRepository.paidPresentation(service.service_id, uidPayment);
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const isFree = await this.isFreeService(token);
        const price = await this.isReductionService(service.price, token);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: service.name + (isFree ? ' (Free)' : ''),
                        },
                        unit_amount: (isFree ? 0 : price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `https://apipcs.c2smr.fr/service/validate-payment:${uidPayment}`,
            cancel_url: `${process.env.FRONTEND_URL}/home`,
        });
        return {url: session.url};
    }

    async validatePayment(uid: string) {
        return this.serviceRepository.validatePayment(uid.replace(':', ''));
    }


}