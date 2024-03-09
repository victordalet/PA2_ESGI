"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureService = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class PictureService {
    getPicture(body) {
        const path = (0, path_1.join)(__dirname, `../../public/${body.picture}.png`);
        return fs_1.readFileSync;
    }
    uploadPicture(body, file) {
        const path = (0, path_1.join)(__dirname, `../../public/${body.picture}.png`);
        (0, fs_1.writeFileSync)(path, file.buffer);
    }
}
exports.PictureService = PictureService;
//# sourceMappingURL=picture.service.js.map