import {FactureModel} from "./facture.model";
import {FactureRepository} from "./facture.repository";

export class FactureService {

    private factureRepository: FactureRepository;

    constructor() {
        this.factureRepository = new FactureRepository();
    }

    async getFactures() {
        return await this.factureRepository.getFactures();
    }


    async createFacture(facture: FactureModel) {
        return await this.factureRepository.createFacture(facture);
    }

    async updateFacture(id: number, facture: FactureModel) {
        return await this.factureRepository.updateFacture(id, facture);
    }

    async deleteFacture(id: number) {
        return await this.factureRepository.deleteFacture(id);
    }
}