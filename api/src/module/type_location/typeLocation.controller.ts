import {Body, Controller, Get, Headers, Post} from "@nestjs/common";
import {ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {TokenValidation} from "../../validation/token/token.validation";
import {TypeLocationModel} from "./typeLocation.model";
import {TypeLocationService} from "./typeLocation.service";

@Controller({path: 'type_location'})
@ApiTags('typeLocation')
export class TypeLocationController {

    private tokenValidation: TokenValidation;

    private typeLocationService: TypeLocationService;

    constructor() {
        this.tokenValidation = new TokenValidation();
        this.typeLocationService = new TypeLocationService();
    }

    @Get()
    @ApiOperation({summary: 'Get all type location'})
    @ApiOkResponse({description: 'type location'})
    @ApiNotFoundResponse({description: 'No type location found'})
    async getTypeLocation(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return await this.typeLocationService.getTypeLocation();
    }

    @Post()
    @ApiOperation({summary: 'Create type location'})
    @ApiOkResponse({description: 'type location'})
    async createTypeLocation(@Body() body: TypeLocationModel, @Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.typeLocationService.createTypeLocation(body);
    }

    @Post('associate')
    @ApiOperation({summary: 'Associate type location'})
    @ApiOkResponse({description: 'type location'})
    async associateTypeLocation(@Body() body: TypeLocationModel, @Headers('authorization') token: string) {
        await this.tokenValidation.validateBailToken(token);
        return await this.typeLocationService.associateTypeLocation(body);
    }


}