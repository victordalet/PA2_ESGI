import {Body, Controller, Delete, Get, Headers, Param, Patch, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ServiceService} from "./service.service";
import {ServiceModel} from "./service.model";
import {TokenValidation} from "../../validation/token/token.validation";
import {LocationAvailability} from "../../core/location";

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

    @Post()
    @ApiOperation({summary: 'Create service'})
    @ApiOkResponse({description: 'Service created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createService(@Headers('authorization') token: string, @Body() body: ServiceModel) {
        await this.tokenValidation.validateToken(token);
        return this.serviceService.createService(body);
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