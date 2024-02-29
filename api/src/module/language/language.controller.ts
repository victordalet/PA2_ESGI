import {Controller, Delete, Get, Headers, Post, UploadedFile} from "@nestjs/common";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LanguageService} from "./language.service";
import {TokenValidation} from "../../validation/token/token.validation";

@Controller({path: 'language'})
@ApiTags('Language')
export class LanguageController {
    private languageService: LanguageService;
    private tokenValidation: TokenValidation;

    constructor() {
        this.languageService = new LanguageService();
        this.tokenValidation = new TokenValidation();
    }

    @Get()
    @ApiOperation({summary: 'Get language file by name'})
    @ApiOkResponse({description: 'Language file'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getLanguageName(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.languageService.getNameLanguage();
    }

    @Get(':name')
    @ApiOperation({summary: 'Get language file by name'})
    @ApiOkResponse({description: 'Language file'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getLanguageFileByName(@Headers('authorization') token: string, name: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.languageService.getLanguageFileByName(name);
    }

    @Post(':name')
    @ApiOperation({summary: 'Create language file'})
    @ApiOkResponse({description: 'Language file created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async postLanguageFile(@Headers('authorization') token: string, @UploadedFile() file: any) {
        await this.tokenValidation.validateAdminToken(token);
        return this.languageService.postLanguageFile(file);
    }


    @Delete(':name')
    @ApiOperation({summary: 'Delete language file'})
    @ApiOkResponse({description: 'Language file deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteLanguageFile(@Headers('authorization') token: string, name: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.languageService.deleteLanguageFile(name);
    }

}
