import {Body, Controller, Get, Headers, Post} from "@nestjs/common";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LanguageService} from "./language.service";
import {TokenValidation} from "../../validation/token/token.validation";
import {Language} from "../../core/langue";

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
    @ApiOperation({summary: 'Get language '})
    @ApiOkResponse({description: 'Language '})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getLanguageName() {
        return this.languageService.getLanguageFileByName();
    }

    @Post()
    @ApiOperation({summary: 'Get language file by name'})
    @ApiOkResponse({description: 'Language file'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getLanguageFileByName(@Headers('authorization') token: string, @Body() body: Language) {
        await this.tokenValidation.validateAdminToken(token);
        return this.languageService.postWord(body);
    }

}
