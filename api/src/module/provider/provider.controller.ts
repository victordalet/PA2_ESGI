import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ProviderService} from "./provider.service";
import {Provider} from "../../core/provider";
import {ProviderModel} from "./provider.model";

@Controller({path: 'provider'})
@ApiTags('Provider')
export class ProviderController {

    private providerService: ProviderService;

    constructor() {
        this.providerService = new ProviderService();
    }

    @Get()
    @ApiOperation({summary: 'Get all providers'})
    @ApiOkResponse({description: 'List of providers'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getProviders(): Promise<Provider[]> {
        return await this.providerService.getProviders();
    }

    @Post()
    @ApiOperation({summary: 'Create provider'})
    @ApiOkResponse({description: 'Provider created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createProvider(@Body() body: ProviderModel) {
        return await this.providerService.createProvider(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update provider'})
    @ApiOkResponse({description: 'Provider updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateProvider(@Param() id: number, @Body() body: ProviderModel) {
        return await this.providerService.updateProvider(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete provider'})
    @ApiOkResponse({description: 'Provider  deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteProvider(@Param() id: number) {
        return await this.providerService.deleteProvider(id);
    }

}