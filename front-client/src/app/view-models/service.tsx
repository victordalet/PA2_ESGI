import {ServiceResponse} from "../@types/service";

export default class ServiceViewModel {

    public filterByDSC(services: ServiceResponse[]): ServiceResponse[] {
        return services.sort((a, b) => {
            return b.price - a.price;
        });
    }

    public filterByASC(services: ServiceResponse[]): ServiceResponse[] {
        return services.sort((a, b) => {
            return a.price - b.price;
        });
    }

    public filterServiceByNameOrDescription(services: ServiceResponse[], text: string): ServiceResponse[] {
        return services.filter((s) => {
            return s.name.includes(text) || s.description.includes(text);
        });
    }

}