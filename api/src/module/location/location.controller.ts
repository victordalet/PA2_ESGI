import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LocationService} from "./location.service";
import {LocationModel} from "./location.model";

@Controller({path: 'location'})
@ApiTags('Location')
export class LocationController {
    private locationService: LocationService;

    constructor() {
        this.locationService = new LocationService();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple locations'})
    @ApiOkResponse({description: 'List of locations'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    getLocations() {
        return this.locationService.getLocations();
    }

    @Post()
    @ApiOperation({summary: 'Create location'})
    @ApiCreatedResponse({description: 'Location created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    createLocation(@Body() body: LocationModel) {
        return this.locationService.createLocation(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update location'})
    @ApiOkResponse({description: 'Location updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    updateLocation(@Param('id') id: number, @Body() body: LocationModel) {
        return this.locationService.updateLocation(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete location'})
    @ApiOkResponse({description: 'Location deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    deleteLocation(@Param('id') id: number) {
        return this.locationService.deleteLocation(id);
    }
}