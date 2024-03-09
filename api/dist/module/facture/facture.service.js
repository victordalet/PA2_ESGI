"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactureService = void 0;
const facture_repository_1 = require("./facture.repository");
class FactureService {
    constructor() {
        this.factureRepository = new facture_repository_1.FactureRepository();
    }
    async getFactures() {
        return await this.factureRepository.getFactures();
    }
    async createFacture(facture) {
        return await this.factureRepository.createFacture(facture);
    }
    async updateFacture(id, facture) {
        return await this.factureRepository.updateFacture(id, facture);
    }
    async deleteFacture(id) {
        return await this.factureRepository.deleteFacture(id);
    }
}
exports.FactureService = FactureService;
//# sourceMappingURL=facture.service.js.map