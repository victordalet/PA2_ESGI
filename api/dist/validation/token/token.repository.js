"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepository = void 0;
const mysql_entity_1 = require("../../database/mysql.entity");
class TokenRepository {
    constructor() {
        this.database = new mysql_entity_1.DatabaseEntity();
        setTimeout(() => {
            this.db = this.database.db;
        }, 500);
    }
    async isFoundToken(token) {
        const [row, field] = await this.db.query("SELECT email FROM USER WHERE connection = ?", [token]);
        return Array.isArray(row) && row.length > 0;
    }
    async isAdminToken(token) {
        var _a;
        const [row, field] = await this.db.query("SELECT rules FROM USER WHERE connection = ?", [token]);
        return ((_a = row[0]) === null || _a === void 0 ? void 0 : _a.rules) === 'ADMIN';
    }
    async isBailToken(token) {
        var _a;
        const [row, field] = await this.db.query("SELECT rules FROM USER WHERE connection = ?", [token]);
        return ((_a = row[0]) === null || _a === void 0 ? void 0 : _a.rules) === 'BAIL';
    }
}
exports.TokenRepository = TokenRepository;
//# sourceMappingURL=token.repository.js.map