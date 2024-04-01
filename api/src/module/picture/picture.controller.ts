import {Body, Controller, Get, Headers, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {PictureModel} from "./picture.model";
import {TokenValidation} from "../../validation/token/token.validation";
import {PictureService} from "./picture.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller({path: 'picture'})
@ApiTags('Picture')
export class PictureController {


    private pictureService: PictureService;
    private tokenValidation: TokenValidation;

    constructor() {
        this.pictureService = new PictureService();
        this.tokenValidation = new TokenValidation();
    }

    @Get(':name')
    @ApiOperation({summary: 'Get one picture'})
    @ApiOkResponse({description: 'base 63 picture'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getPicture(@Param('name') name: string) {
        return this.pictureService.getPicture(name);
    }

    @Post()
    @ApiOperation({summary: 'Post one picture'})
    @ApiOperation({description: ''})
    @UseInterceptors(FileInterceptor('file'))
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async uploadPicture(@Headers('authorization') token: string, @Body() body: PictureModel,
                        @UploadedFile() file: Express.Multer.File) {
        await this.tokenValidation.validateBailToken(token);
        return this.pictureService.uploadPicture(body, file);
    }


}