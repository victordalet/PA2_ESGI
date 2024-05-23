import {Body, Controller, Delete, Get, Headers, Param, Patch, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LocationService} from "./location.service";
import {LocationModel, RequestLocationServiceModel} from "./location.model";
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

    @Post('reset-messages-occupation')
    @ApiOperation({summary: 'Reset messages occupation'})
    @ApiCreatedResponse({description: 'Messages occupation reset'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async resetMessagesOccupation(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateAdminToken(token);
        return this.locationService.resetNewMessages(body.location_id);
    }

    @Post()
    @ApiOperation({summary: 'Create location'})
    @ApiCreatedResponse({description: 'Location created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createLocation(@Headers('authorization') token: string, @Body() body: LocationModel) {
        await this.tokenValidation.validateToken(token)
        return this.locationService.createLocation(body);
    }

    @Post("create-location-validation")
    @ApiOperation({summary: 'Create location'})
    @ApiCreatedResponse({description: 'Location created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createLocationValidation(@Headers('authorization') token: string, @Param() uid: string) {
        return this.locationService.createLocationValidation(uid);
    }

    @Post("location-paiement")
    @ApiOperation({summary: 'Create location'})
    @ApiCreatedResponse({description: 'Location created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async locationPaiement(@Headers('authorization') token: string, @Body() body: LocationModel) {
        return this.locationService.locationPaiement(body.id);
    }

    @Post("location-occupation-paiement-validation")
    @ApiOperation({summary: 'Create location'})
    @ApiCreatedResponse({description: 'Location created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async locationOccupationPaiementValidation(@Headers('authorization') token: string, @Param() uid: string) {
        return this.locationService.locationOccupationPaiementValidation(uid);
    }

    @Post("location-occupation-paiement")
    @ApiOperation({summary: 'Create location'})
    @ApiCreatedResponse({description: 'Location created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async locationOccupationPaiement(@Headers('authorization') token: string, @Body() body: LocationModel) {
        return this.locationService.locationOccupationPaiement(body.id, body.price);
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
        return this.locationService.getMessagesByLocationOccupationId(body.location_id, token);
    }

    @Post('occupation-info-admin')
    @ApiOperation({summary: 'Get location occupation info by admin'})
    @ApiCreatedResponse({description: 'Location occupation info'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getLocationOccupationInfoByAdmin(@Headers('authorization') token: string) {
        return this.locationService.getLocationOccupationInfoByAdmin();
    }

    @Post('occupation-service')
    @ApiOperation({summary: 'Get location occupation by service'})
    @ApiCreatedResponse({description: 'Location occupation'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getLocationOccupationByService(@Headers('authorization') token: string) {
        return this.locationService.getLocationOccupationByServiceRequest();
    }

    @Post('add-occupation-service')
    @ApiOperation({summary: 'Add location occupation by service'})
    @ApiCreatedResponse({description: 'Location occupation'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async addLocationOccupationByService(@Headers('authorization') token: string, @Body() body: RequestLocationServiceModel) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.addLocationOccupationByService(body);
    }

    @Post('get-location-occupation')
    @ApiOperation({summary: 'Get location occupation by user'})
    @ApiCreatedResponse({description: 'Location occupation'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getLocationOccupationByUser(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return this.locationService.getLocationOccupationByUser(token);
    }

    @Post('remove-location-occupation')
    @ApiOperation({summary: 'Remove location occupation'})
    @ApiCreatedResponse({description: 'Location occupation removed'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async removeLocationOccupation(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateAdminToken(token);
        return this.locationService.removeLocationOccupation(body.location_occupation_id);
    }

    @Post('accept-location-occupation')
    @ApiOperation({summary: 'Accept location occupation'})
    @ApiCreatedResponse({description: 'Location occupation accepted'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async acceptLocationOccupation(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateAdminToken(token);
        return this.locationService.acceptLocationOccupation(body.location_occupation_id, body.from_datetime, body.to_datetime, body.state_place, body.email, body.name);
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
        return this.locationService.deleteLocation(id, token);
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
        return this.locationService.deleteLocationOccupation(body.location_id, token);
    }

    @Patch('admin-accept')
    @ApiOperation({summary: 'Admin accept location occupation'})
    @ApiOkResponse({description: 'Location occupation accepted'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async adminAcceptLocationOccupation(@Headers('authorization') token: string, @Body() body: LocationAvailability) {
        await this.tokenValidation.validateAdminToken(token);
        return this.locationService.adminAcceptLocationOccupation(body.location_id);
    }

}