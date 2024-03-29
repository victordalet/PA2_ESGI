import {join} from "path";
import {readFileSync, writeFileSync, readdirSync} from "fs";

export class FileService {

    getFileByName(name: string) {
        const path = join(__dirname, `../../../public/${name}.pdf`);
        return readFileSync(path);
    }

    createFileByName(name: string, file: Express.Multer.File) {
        const path = join(__dirname, `../../../public/${name}.pdf`);
        writeFileSync(path, file.buffer);
    }

    getFilesName(file: string): string[] {
        const path = join(__dirname, `../../../public/`);
        const filesName: string[] = [];
        const regex = new RegExp(`${file}.*.pdf`);
        const directory = readdirSync(path);
        directory.forEach(file => {
            if (regex.test(file)) {
                filesName.push(file);
            }
        });
        return filesName;
    }

}