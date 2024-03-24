import {Controller, Get, Param, Post, Headers} from "@nestjs/common";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {FileService} from "./file.service";
import {TokenValidation} from "../../validation/token/token.validation";

@Controller({path: 'file'})
@ApiTags('File')
export class FileController {

    fileService: FileService;
    tokenValidation: TokenValidation;

    constructor() {
        this.fileService = new FileService();
        this.tokenValidation = new TokenValidation();
    }

    @Get(':name')
    @ApiOperation({summary: 'Get file by name'})
    @ApiOkResponse({description: 'File'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getFileByName(@Param('name') name: string, @Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return this.fileService.getFileByName(name);
    }

    @Post(':name')
    @ApiOperation({summary: 'Create file by name'})
    @ApiOkResponse({description: 'File'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async createFileByName(@Param('name') name: string, file: Express.Multer.File, @Headers('authorization') token: string) {
        await this.tokenValidation.validatePrestataireOrBailToken(token);
        return this.fileService.createFileByName(name, file);
    }

    @Post('get-name-files:file')
    @ApiOperation({summary: 'Get all files name'})
    @ApiOkResponse({description: 'Files name'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getFilesName(@Headers('authorization') token: string, @Param('file') file: string) {
        await this.tokenValidation.validateToken(token);
        return {data: this.fileService.getFilesName(file)};
    }

}