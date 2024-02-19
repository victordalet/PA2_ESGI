import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {BodyTicket, BodyTicketMessage} from "./ticket.model";
import {TicketService} from "./ticket.service";

@Controller({path: 'ticket'})
@ApiTags('Ticket')
export class TicketController {

    private ticketService: TicketService;

    constructor() {
        this.ticketService = new TicketService();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple tickets'})
    @ApiOkResponse({description: 'List of tickets'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    getTickets() {
        return this.ticketService.getTickets();
    }

    @Post()
    @ApiOperation({summary: 'Create ticket'})
    @ApiCreatedResponse({description: 'Ticket created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    createTicket(@Body() body: BodyTicket) {
        return this.ticketService.createTicket(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update ticket'})
    @ApiOkResponse({description: 'Ticket updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    updateTicket(@Param('id') id: number, @Body() body: BodyTicket) {
        return this.ticketService.updateTicket(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete ticket'})
    @ApiOkResponse({description: 'Ticket deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    deleteTicket(@Param('id') id: number) {
        return this.ticketService.deleteTicket(id);
    }

    @Post(':id/message')
    @ApiOperation({summary: 'Create message ticket'})
    @ApiCreatedResponse({description: 'Message ticket created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    createMessageTicket(@Param('id') id: number, @Body() body: BodyTicketMessage) {
        return this.ticketService.createMessageTicket(id, body);
    }

    @Get(':id/message')
    @ApiOperation({summary: 'Get multiple message tickets'})
    @ApiOkResponse({description: 'List of message tickets'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    getMessageTickets(@Param('id') id: number) {
        return this.ticketService.getMessageTickets(id);
    }

    @Put(':id/message/:messageId')
    @ApiOperation({summary: 'Update message ticket'})
    @ApiOkResponse({description: 'Message ticket updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    updateMessageTicket(@Param('id') id: number, @Param('messageId') messageId: number, @Body() body: BodyTicketMessage) {
        return this.ticketService.updateMessageTicket(id, messageId, body);
    }

    @Delete(':id/message/:messageId')
    @ApiOperation({summary: 'Delete message ticket'})
    @ApiOkResponse({description: 'Message ticket deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    deleteMessageTicket(@Param('id') id: number, @Param('messageId') messageId: number) {
        return this.ticketService.deleteMessageTicket(id, messageId);
    }


}