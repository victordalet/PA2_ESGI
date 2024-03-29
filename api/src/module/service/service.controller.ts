import {Body, Controller, Delete, Get, Headers, Param, Patch, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ServiceService} from "./service.service";
import {ServiceModel} from "./service.model";
import {TokenValidation} from "../../validation/token/token.validation";
import {LocationAvailability, LocationLiaison} from "../../core/location";

@Controller('service')
@ApiTags('Service')
export class ServiceController {

    private serviceService: ServiceService;
    private tokenValidation: TokenValidation;

    constructor() {
        this.serviceService = new ServiceService();
        this.tokenValidation = new TokenValidation();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple services'})
    @ApiOkResponse({description: 'List of services'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getServices(@Headers('authorization') token: string) {
        return this.serviceService.getServices();
    }

    @Post('service-by-email')
    @ApiOperation({summary: 'Get service by id'})
    @ApiCreatedResponse({description: 'Service'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getServiceById(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.getServiceByEmail(token);
    }

    @Post('service-by-location')
    @ApiOperation({summary: 'Post service by location'})
    @ApiCreatedResponse({description: 'Service'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async postServiceByLocation(@Headers('authorization') token: string, @Body() body: LocationLiaison) {
        await this.tokenValidation.validateBailToken(token);
        return this.serviceService.postServiceByLocation(body);
    }


    @Post('service-by-user')
    @ApiOperation({summary: 'Post service by user'})
    @ApiCreatedResponse({description: 'Service'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async postServiceByUser(@Headers('authorization') token: string, @Body() body: LocationLiaison) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.postServiceByUser(token, body);
    }


    @Post('get-service-by-location')
    @ApiOperation({summary: 'Post service by location'})
    @ApiCreatedResponse({description: 'Service'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getServiceByLocation(@Headers('authorization') token: string, @Body() body: LocationLiaison) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.getServiceByLocation(body);
    }


    @Post('get-service-by-user')
    @ApiOperation({summary: 'Post service by user'})
    @ApiCreatedResponse({description: 'Service'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getServiceByUser(@Headers('authorization') token: string, @Body() body: LocationLiaison) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.getServiceByUser(body);
    }


    @Post()
    @ApiOperation({summary: 'Create service'})
    @ApiOkResponse({description: 'Service created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createService(@Headers('authorization') token: string, @Body() body: ServiceModel) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.createService(body);
    }

    @Post('get-location-by-service')
    @ApiOperation({summary: 'Get location by service'})
    @ApiCreatedResponse({description: 'Location'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async getLocationByServiceId(@Headers('authorization') token: string, @Body() body: ServiceModel) {
        await this.tokenValidation.validateToken(token);
        return await this.serviceService.getLocationByServiceId(body);
    }

    @Patch('remove-location-by-service')
    @ApiOperation({summary: 'Remove location by service'})
    @ApiOkResponse({description: 'Location removed'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async removeLocationByServiceId(@Headers('authorization') token: string, @Body() body: ServiceModel) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.removeLocationByServiceId(body,token);
    }

    @Patch('notation')
    @ApiOperation({summary: 'Notation service'})
    @ApiOkResponse({description: 'Service noted'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async notationService(@Headers('authorization') token: string, @Body() body: ServiceModel) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.notationService(body,token);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update service'})
    @ApiOkResponse({description: 'Service updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateService(@Headers('authorization') token: string, @Param('id') id: number, @Body() body: ServiceModel) {
        await this.tokenValidation.validateAdminToken(token);
        return this.serviceService.updateService(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete service'})
    @ApiOkResponse({description: 'Service deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteService(@Headers('authorization') token: string, @Param('id') id: number) {
        await this.tokenValidation.validateAdminToken(token);
        return this.serviceService.deleteService(id);
    }


}