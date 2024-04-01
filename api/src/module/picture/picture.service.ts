import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import {Picture} from "../../core/picture";

export class PictureService {

    public getPicture(name: string) {
        const path = join(__dirname, `../../../public/${name}.png`);
        const base64 = readFileSync(path, {encoding: 'base64'});
        return {base64: base64};
    }

    public uploadPicture(body: Picture, file: Express.Multer.File) {
        const path = join(__dirname, `../../../public/${body.picture}.png`);
        writeFileSync(path, file.buffer);
    }

}