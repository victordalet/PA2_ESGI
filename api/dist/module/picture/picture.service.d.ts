/// <reference types="node" />
/// <reference types="multer" />
import { readFileSync } from 'fs';
import { Picture } from "../../core/picture";
export declare class PictureService {
    getPicture(body: Picture): typeof readFileSync;
    uploadPicture(body: Picture, file: Express.Multer.File): void;
}
