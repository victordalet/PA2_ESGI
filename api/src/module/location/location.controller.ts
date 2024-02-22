import {Body, Controller, Delete, Get, Headers, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LocationService} from "./location.service";
import {LocationModel} from "./location.model";
import {TokenValidation} from "../../validation/token/token.validation";

@Controller({path: 'location'})
@ApiTags('Location')
export class LocationController {
    private locationService: LocationService;
    private tokenValidation: TokenValidation;

    constructor() {
        this.locationService = new LocationService();
        this.tokenValidation = new TokenValidation();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple locations'})
    @ApiOkResponse({description: 'List of locations'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getLocations(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.locationService.getLocations();
    }

    @Post()
    @ApiOperation({summary: 'Create location'})
    @ApiCreatedResponse({description: 'Location created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createLocation(@Headers('authorization') token: string, @Body() body: LocationModel) {
        await this.tokenValidation.validateAdminToken(token);
        return this.locationService.createLocation(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update location'})
    @ApiOkResponse({description: 'Location updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateLocation(@Headers('authorization') token: string, @Param('id') id: number, @Body() body: LocationModel) {
        await this.tokenValidation.validateAdminToken(token);
        return this.locationService.updateLocation(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete location'})
    @ApiOkResponse({description: 'Location deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteLocation(@Headers('authorization') token: string, @Param('id') id: number) {
        await this.tokenValidation.validateAdminToken(token);
        return this.locationService.deleteLocation(id);
    }
}