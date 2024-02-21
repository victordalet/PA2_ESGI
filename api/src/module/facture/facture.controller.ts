import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {FactureModel} from "./facture.model";
import {FactureService} from "./facture.service";

@Controller({path: 'facture'})
@ApiTags('facture')
export class FactureController {

    private readonly factureService: FactureService;

    constructor() {
        this.factureService = new FactureService();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple factures'})
    @ApiOkResponse({description: 'List of factures'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    getFactures() {
        return this.factureService.getFactures();
    }

    @Post()
    @ApiOperation({summary: 'Create facture'})
    @ApiCreatedResponse({description: 'Facture created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    createFacture(@Body() body: FactureModel) {
        return this.factureService.createFacture(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update facture'})
    @ApiOkResponse({description: 'Facture updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    updateFacture(@Param('id') id: number, @Body() body: FactureModel) {
        return this.factureService.updateFacture(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete facture'})
    @ApiOkResponse({description: 'Facture deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    deleteFacture(@Param('id') id: number) {
        return this.factureService.deleteFacture(id);
    }
}