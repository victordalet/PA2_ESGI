import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {MessageService} from "./message.service";
import {UserMessage} from "../../core/user";
import {BodyMessage} from "./message.model";

@Controller({path: 'message'})
@ApiTags('Message')
export class MessageController {
    private messageService: MessageService;

    constructor() {
        this.messageService = new MessageService();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple messages'})
    @ApiOkResponse({description: 'List of messages'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    getMessages() {
        return this.messageService.getMessages();
    }

    @Get('mail_from')
    @ApiOperation({summary: 'Get multiple messages'})
    @ApiOkResponse({description: 'List of messages'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    getMessageByMail(@Param('email') email: string) {
        return this.messageService.getMessagesByEmailFrom(email);
    }

    @Get('mail_to')
    @ApiOperation({summary: 'Get multiple messages'})
    @ApiOkResponse({description: 'List of messages'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    getMessageByMailTo(@Param('email') email: string) {
        return this.messageService.getMessagesByEmailTo(email);
    }

    @Post()
    @ApiOperation({summary: 'Create message'})
    @ApiCreatedResponse({description: 'Message created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    createMessage(@Body() body: BodyMessage) {
        return this.messageService.createMessage(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update message'})
    @ApiOkResponse({description: 'Message updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    updateMessage(@Param('id') id: number, @Body() body: BodyMessage) {
        return this.messageService.updateMessage(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete message'})
    @ApiOkResponse({description: 'Message deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    deleteMessage(@Param('id') id: number) {
        return this.messageService.deleteMessage(id);
    }

}