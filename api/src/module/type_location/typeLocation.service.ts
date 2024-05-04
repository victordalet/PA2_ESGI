import {TypeLocationRepository} from "./typeLocation.repository";
import {TypeLocationModel} from "./typeLocation.model";

export class TypeLocationService {

    typeLocationRepository: TypeLocationRepository;

    constructor() {
        this.typeLocationRepository = new TypeLocationRepository();
    }

    async getTypeLocation() {
        return await this.typeLocationRepository.getTypeLocation();
    }

    async createTypeLocation(body: TypeLocationModel) {
        return await this.typeLocationRepository.createTypeLocation(body.type_location);
    }

    async associateTypeLocation(body: TypeLocationModel) {
        return await this.typeLocationRepository.associateTypeLocation(body.id, body.type_location);
    }
}