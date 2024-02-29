import * as fs from 'fs';

export class LanguageService {
    async getLanguageFileByName(name: string) {
        return fs.readFileSync('file/' + name + '.txt', 'utf8');
    }

    async getNameLanguage() {
        return fs.readdirSync('file');
    }

    async postLanguageFile(file: any) {
        fs.writeFileSync('file/' + file.name + ".txt", file);
    }

    async deleteLanguageFile(name: string) {
        fs.unlinkSync(name);
    }
}