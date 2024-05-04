import {Controller, Get, UploadedFile, Post, Headers, Body, UseInterceptors, Param} from "@nestjs/common";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {FileService} from "./file.service";
import {TokenValidation} from "../../validation/token/token.validation";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller({path: 'file'})
@ApiTags('File')
export class FileController {

    fileService: FileService;
    tokenValidation: TokenValidation;

    constructor() {
        this.fileService = new FileService();
        this.tokenValidation = new TokenValidation();
    }

    @Get()
    @ApiOperation({summary: 'Get file by name'})
    @ApiOkResponse({description: 'File'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getFileByName(@Param() name: string, @Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return this.fileService.getFileByName(name);
    }

    @Post()
    @ApiOperation({summary: 'Create file by name'})
    @ApiOkResponse({description: 'File'})
    @UseInterceptors(FileInterceptor('file'))
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async createFileByName(@Body() body: {
        name: string;
    }, @UploadedFile() file: Express.Multer.File, @Headers('authorization') token: string) {
        await this.tokenValidation.validatePrestataireOrBailToken(token);
        return this.fileService.createFileByName(body.name, file);
    }

    @Post('get-name-files')
    @ApiOperation({summary: 'Get all files name'})
    @ApiOkResponse({description: 'Files name'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getFilesName(@Headers('authorization') token: string, @Body() body: { file: string; }) {
        await this.tokenValidation.validateToken(token);
        return {data: this.fileService.getFilesName(body.file)};
    }

}