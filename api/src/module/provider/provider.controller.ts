import {Body, Controller, Delete, Get, Headers, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ProviderService} from "./provider.service";
import {Provider} from "../../core/provider";
import {ProviderModel} from "./provider.model";
import {TokenValidation} from "../../validation/token/token.validation";

@Controller({path: 'provider'})
@ApiTags('Provider')
export class ProviderController {

    private providerService: ProviderService;
    private tokenValidation: TokenValidation;

    constructor() {
        this.providerService = new ProviderService();
        this.tokenValidation = new TokenValidation();
    }

    @Get()
    @ApiOperation({summary: 'Get all providers'})
    @ApiOkResponse({description: 'List of providers'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getProviders(@Headers('authorization') token: string): Promise<Provider[]> {
        await this.tokenValidation.validateAdminToken(token);
        return await this.providerService.getProviders();
    }

    @Post()
    @ApiOperation({summary: 'Create provider'})
    @ApiOkResponse({description: 'Provider created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createProvider(@Headers('authorization') token: string, @Body() body: ProviderModel) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.providerService.createProvider(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update provider'})
    @ApiOkResponse({description: 'Provider updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateProvider(@Headers('authorization') token: string, @Param() id: number, @Body() body: ProviderModel) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.providerService.updateProvider(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete provider'})
    @ApiOkResponse({description: 'Provider  deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteProvider(@Headers('authorization') token: string, @Param() id: number) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.providerService.deleteProvider(id);
    }

}