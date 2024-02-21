import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ServiceService} from "./service.service";
import {ServiceModel} from "./service.model";

@Controller('service')
@ApiTags('Service')
export class ServiceController {

    private serviceService: ServiceService;

    constructor() {
        this.serviceService = new ServiceService();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple services'})
    @ApiOkResponse({description: 'List of services'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getServices() {
        return this.serviceService.getServices();
    }

    @Post()
    @ApiOperation({summary: 'Create service'})
    @ApiOkResponse({description: 'Service created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createService(@Body() body: ServiceModel) {
        return this.serviceService.createService(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update service'})
    @ApiOkResponse({description: 'Service updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateService(@Param('id') id: number, @Body() body: ServiceModel) {
        return this.serviceService.updateService(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete service'})
    @ApiOkResponse({description: 'Service deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteService(@Param('id') id: number) {
        return this.serviceService.deleteService(id);
    }


}