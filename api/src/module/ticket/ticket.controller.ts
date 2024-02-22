import {Body, Controller, Delete, Get, Headers, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {BodyTicket, BodyTicketMessage} from "./ticket.model";
import {TicketService} from "./ticket.service";
import {TokenValidation} from "../../validation/token/token.validation";

@Controller({path: 'ticket'})
@ApiTags('Ticket')
export class TicketController {

    private ticketService: TicketService;
    private tokenValidation: TokenValidation;

    constructor() {
        this.ticketService = new TicketService();
        this.tokenValidation = new TokenValidation();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple tickets'})
    @ApiOkResponse({description: 'List of tickets'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getTickets(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.getTickets();
    }

    @Post()
    @ApiOperation({summary: 'Create ticket'})
    @ApiCreatedResponse({description: 'Ticket created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createTicket(@Headers('authorization') token: string, @Body() body: BodyTicket) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.createTicket(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update ticket'})
    @ApiOkResponse({description: 'Ticket updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateTicket(@Headers('authorization') token: string, @Param('id') id: number, @Body() body: BodyTicket) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.updateTicket(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete ticket'})
    @ApiOkResponse({description: 'Ticket deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteTicket(@Headers('authorization') token: string, @Param('id') id: number) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.deleteTicket(id);
    }

    @Post(':id/message')
    @ApiOperation({summary: 'Create message ticket'})
    @ApiCreatedResponse({description: 'Message ticket created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createMessageTicket(@Headers('authorization') token: string, @Param('id') id: number, @Body() body: BodyTicketMessage) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.createMessageTicket(id, body);
    }

    @Get(':id/message')
    @ApiOperation({summary: 'Get multiple message tickets'})
    @ApiOkResponse({description: 'List of message tickets'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getMessageTickets(@Headers('authorization') token: string, @Param('id') id: number) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.getMessageTickets(id);
    }

    @Put(':id/message/:messageId')
    @ApiOperation({summary: 'Update message ticket'})
    @ApiOkResponse({description: 'Message ticket updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateMessageTicket(@Headers('authorization') token: string, @Param('id') id: number, @Param('messageId') messageId: number, @Body() body: BodyTicketMessage) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.updateMessageTicket(id, messageId, body);
    }

    @Delete(':id/message/:messageId')
    @ApiOperation({summary: 'Delete message ticket'})
    @ApiOkResponse({description: 'Message ticket deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteMessageTicket(@Headers('authorization') token: string, @Param('id') id: number, @Param('messageId') messageId: number) {
        await this.tokenValidation.validateAdminToken(token);
        return this.ticketService.deleteMessageTicket(id, messageId);
    }


}