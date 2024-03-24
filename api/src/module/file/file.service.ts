import {join} from "path";
import {readFileSync, writeFileSync} from "fs";

export class FileService {

    getFileByName(name: string) {
        const path = join(__dirname, `../../../public/${name}.pdf`);
        return readFileSync(path);
    }

    createFileByName(name: string, file: Express.Multer.File) {
        const path = join(__dirname, `../../../public/${name}.pdf`);
        writeFileSync(path, file.buffer);
    }

}