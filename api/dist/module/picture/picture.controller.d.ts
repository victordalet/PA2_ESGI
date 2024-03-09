/// <reference types="node" />
/// <reference types="multer" />
import { PictureModel } from "./picture.model";
export declare class PictureController {
    private pictureService;
    private tokenValidation;
    constructor();
    getPicture(token: string, body: PictureModel): Promise<typeof import("fs").readFileSync>;
    uploadPicture(token: string, body: PictureModel, file: Express.Multer.File): Promise<void>;
}
