import {Body, Controller, Delete, Get, Headers, Param, Patch, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LocationService} from "./location.service";
import {LocationModel} from "./location.model";
import {TokenValidation} from "../../validation/token/token.validation";
import {LocationAvailability, LocationMessage} from "../../core/location";

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
        return this.locationService.getLocations();
    }

    @Post('location-by-email')
    @ApiOperation({summary: 'Get location by id'})
    @ApiCreatedResponse({description: 'Location'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getLocationById(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.getLocationByEmail(token);
    }

    @Post()
    @ApiOperation({summary: 'Create location'})
    @ApiCreatedResponse({description: 'Location created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createLocation(@Headers('authorization') token: string, @Body() body: LocationModel) {
        await this.tokenValidation.validateToken(token)
        return this.locationService.createLocation(body);
    }

    @Post('occupation')
    @ApiOperation({summary: 'Add location occupation'})
    @ApiCreatedResponse({description: 'Location occupation added'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async addLocationOccupation(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.addLocationOccupation(body, token);
    }

    @Post('occupation-bail')
    @ApiOperation({summary: 'Add location occupation by bail'})
    @ApiCreatedResponse({description: 'Location occupation added'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async addLocationOccupationByBail(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateBailToken(token);
        return this.locationService.addLocationOccupationByBail(body, token);
    }

    @Post('is-occupied-by-user')
    @ApiOperation({summary: 'Check if location is occupied by user'})
    @ApiOkResponse({description: 'Location is occupied by user'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async locationIsOccupiedByUser(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.locationIsOccupiedByUser(body.location_id, token);
    }

    @Post('get-occupation')
    @ApiOperation({summary: 'Get location occupation'})
    @ApiCreatedResponse({description: 'Location occupation'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getLocationOccupation(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.getLocationOccupation(body.location_id);
    }

    @Post('add-notation')
    @ApiOperation({summary: 'Add location notation'})
    @ApiCreatedResponse({description: 'Location notation added'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async addLocationNotation(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.addLocationNotation(body.location_id, body.notation, token);
    }

    @Post('get-notation')
    @ApiOperation({summary: 'Get location notation'})
    @ApiCreatedResponse({description: 'Location notation'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getNotationLocation(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.getNotationLocation(body.location_id);
    }

    @Post('is-occupied')
    @ApiOperation({summary: 'Check if location is occupied'})
    @ApiOkResponse({description: 'Location is occupied'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async locationIsOccupied(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.locationIsOccupied(body);
    }

    @Post('add-message')
    @ApiOperation({summary: 'Add message to location occupation'})
    @ApiCreatedResponse({description: 'Message added'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async addMessageByLocationOccupationId(@Headers('authorization') token: string, @Body() body: LocationMessage) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.addMessageByLocationOccupationId(body.location_occupation_id, body.message, token);
    }

    @Post('get-messages')
    @ApiOperation({summary: 'Get messages by location occupation id'})
    @ApiCreatedResponse({description: 'Messages'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getMessagesByLocationOccupationId(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.getMessagesByLocationOccupationId(body.location_id,token);
    }

    @Post('get-location-occupation')
    @ApiOperation({summary: 'Get location occupation by user'})
    @ApiCreatedResponse({description: 'Location occupation'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getLocationOccupationByUser(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.getLocationOccupationByUser(token);
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
        await this.tokenValidation.validateBailToken(token);
        return this.locationService.deleteLocation(id,token);
    }


    @Delete('admin/:id')
    @ApiOperation({summary: 'Delete location by admin'})
    @ApiOkResponse({description: 'Location deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteLocationByAdmin(@Headers('authorization') token: string, @Param('id') id: number) {
        await this.tokenValidation.validateAdminToken(token);
        return this.locationService.deleteLocationByAdmin(id);
    }

    @Patch('occupation')
    @ApiOperation({summary: 'Delete location occupation'})
    @ApiOkResponse({description: 'Location occupation deleted'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async deleteLocationOccupation(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.deleteLocationOccupation(body.location_id,token);
    }

}