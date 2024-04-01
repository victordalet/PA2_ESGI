import {Body, Controller, Delete, Get, Headers, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {MessageService} from "./message.service";
import {BodyMessage} from "./message.model";
import {TokenValidation} from "../../validation/token/token.validation";

@Controller({path: 'message'})
@ApiTags('Message')
export class MessageController {
    private messageService: MessageService;
    private tokenValidation: TokenValidation;

    constructor() {
        this.messageService = new MessageService();
        this.tokenValidation = new TokenValidation();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple messages'})
    @ApiOkResponse({description: 'List of messages'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getMessages(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.getMessages();
    }

    @Get('mail_from')
    @ApiOperation({summary: 'Get multiple messages'})
    @ApiOkResponse({description: 'List of messages'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getMessageByMail(@Headers('authorization') token: string, @Param('email') email: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.getMessagesByEmailFrom(email);
    }

    @Get('mail_to')
    @ApiOperation({summary: 'Get multiple messages'})
    @ApiOkResponse({description: 'List of messages'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getMessageByMailTo(@Headers('authorization') token: string, @Param('email') email: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.getMessagesByEmailTo(email);
    }

    @Post()
    @ApiOperation({summary: 'Create message'})
    @ApiCreatedResponse({description: 'Message created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createMessage(@Headers('authorization') token: string, @Body() body: BodyMessage) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.createMessage(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update message'})
    @ApiOkResponse({description: 'Message updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateMessage(@Headers('authorization') token: string, @Param('id') id: number, @Body() body: BodyMessage) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.updateMessage(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete message'})
    @ApiOkResponse({description: 'Message deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteMessage(@Headers('authorization') token: string, @Param('id') id: number) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.deleteMessage(id);
    }


    @Get('illegible')
    @ApiOperation({summary: 'Get illegible messages'})
    @ApiOkResponse({description: 'List of messages'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getIllegibleMessages(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.getIllegibleMessages();
    }

    @Post('illegible')
    @ApiOperation({summary: 'Add illegible word'})
    @ApiOkResponse({description: 'Word added'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async addIllegibleWord(@Headers('authorization') token: string, @Body() body: { word: string }) {
        await this.tokenValidation.validateAdminToken(token);
        return this.messageService.addIllegibleWord(body.word);
    }

}