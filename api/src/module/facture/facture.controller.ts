import {Body, Controller, Delete, Get, Param, Post, Put, Headers} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {FactureModel} from "./facture.model";
import {FactureService} from "./facture.service";
import {TokenValidation} from "../../validation/token/token.validation";

@Controller({path: 'facture'})
@ApiTags('facture')
export class FactureController {

    private readonly factureService: FactureService;
    private readonly tokenValidation: TokenValidation;

    constructor() {
        this.factureService = new FactureService();
        this.tokenValidation = new TokenValidation();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple factures'})
    @ApiOkResponse({description: 'List of factures'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getFactures(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.factureService.getFactures();
    }

    @Post()
    @ApiOperation({summary: 'Create facture'})
    @ApiCreatedResponse({description: 'Facture created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createFacture(@Headers('authorization') token: string, @Body() body: FactureModel) {
        await this.tokenValidation.validateAdminToken(token);
        return this.factureService.createFacture(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update facture'})
    @ApiOkResponse({description: 'Facture updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateFacture(@Headers('authorization') token: string, @Param('id') id: number, @Body() body: FactureModel) {
        await this.tokenValidation.validateAdminToken(token);
        return this.factureService.updateFacture(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete facture'})
    @ApiOkResponse({description: 'Facture deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteFacture(@Headers('authorization') token: string, @Param('id') id: number) {
        await this.tokenValidation.validateAdminToken(token);
        return this.factureService.deleteFacture(id);
    }
}