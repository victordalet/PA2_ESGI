import {Body, Controller, Delete, Get, Headers, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {BodySubscription} from "./subscription.model";
import {SubscriptionService} from "./subscription.service";
import {TokenValidation} from "../../validation/token/token.validation";

@Controller({path: 'subscription'})
@ApiTags('Subscription')
export class SubscriptionController {
    private subscriptionService: SubscriptionService;
    private tokenValidation: TokenValidation;

    constructor() {
        this.subscriptionService = new SubscriptionService();
        this.tokenValidation = new TokenValidation();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple subscriptions'})
    @ApiOkResponse({description: 'List of subscriptions'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async getSubscriptions(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.getSubscriptions();
    }

    @Post()
    @ApiOperation({summary: 'Create subscription'})
    @ApiCreatedResponse({description: 'Subscription created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async createSubscription(@Headers('authorization') token: string, @Body() body: BodySubscription) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.createSubscription(body);
    }

    @Post('subscribe')
    @ApiOperation({summary: 'Subscribe user'})
    @ApiCreatedResponse({description: 'User subscribed'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async subscribeUser(@Headers('authorization') token: string, @Body() body: BodySubscription) {
        await this.tokenValidation.validateToken(token);
        return this.subscriptionService.subscribeUserByToken(token, body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update subscription'})
    @ApiOkResponse({description: 'Subscription updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateSubscription(@Headers('authorization') token: string, @Param('id') id: number, @Body() body: BodySubscription) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.updateSubscription(id, body);
    }

    @Delete('/by_id/:id')
    @ApiOperation({summary: 'Delete subscription'})
    @ApiOkResponse({description: 'Subscription deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async deleteSubscription(@Headers('authorization') token: string, @Param('id') id: number) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.deleteSubscription(id);
    }

    @Delete('unsubscribe')
    @ApiOperation({summary: 'Unsubscribe user'})
    @ApiOkResponse({description: 'User unsubscribed'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async unsubscribeUser(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return this.subscriptionService.unsubscribeUserByToken(token);
    }

    @Get(':email')
    @ApiOperation({summary: 'Check if user is subscribed'})
    @ApiOkResponse({description: 'User is subscribed'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async userIsSubscribed(@Headers('authorization') token: string, @Param('email') email: string) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.userIsSubscribed(email);
    }
}