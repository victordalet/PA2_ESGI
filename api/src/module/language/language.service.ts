import * as fs from 'fs';

export class LanguageService {
    async getLanguageFileByName(name: string) {
        return fs.readFileSync('file/' + name);
    }

    async getNameLanguage() {
        const files = fs.readdirSync('file');
        return files;
    }

    async postLanguageFile(file: any) {
        fs.writeFileSync('file/' + file.name, file);
    }

    async deleteLanguageFile(name: string) {
        fs.unlinkSync(name);
    }
}