import {Body, Controller, Delete, Get, Headers, Param, Post, Put, Redirect} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {BodySubscription, BodySubscriptionPrice} from "./subscription.model";
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
        return this.subscriptionService.createSubscription(token);
    }

    @Post('subscribe')
    @ApiOperation({summary: 'Subscribe user'})
    @ApiCreatedResponse({description: 'User subscribed'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async subscribeUser(@Headers('authorization') token: string, @Body() body: BodySubscription) {
        await this.tokenValidation.validateToken(token);
        return await this.subscriptionService.subscribeUserByToken(token, body);
    }

    @Get('subscribe-validation:uid')
    @Redirect("http://localhost:3000", 301)
    @ApiOperation({summary: 'Subscribe user'})
    @ApiCreatedResponse({description: 'User subscribed'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async subscribeUserValidation(@Headers('authorization') token: string, @Param() body: any) {
        return await this.subscriptionService.subscribeUserValidation(body.uid);
    }

    @Post('is_subscribe')
    @ApiOperation({summary: 'Check if user is subscribed'})
    @ApiOkResponse({description: 'User is subscribed'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    async userIsSubscribed(@Headers('authorization') token: string) {
        return this.subscriptionService.userIsSubscribed(token);
    }

    @Post('last_date_free_service')
    @ApiOperation({summary: 'Get last date of free service'})
    @ApiOkResponse({description: 'Last date of free service'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async lastDateFreeService(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return this.subscriptionService.lastDateFreeService(token);
    }

    @Post('price')
    @ApiOperation({summary: 'Get subscription price'})
    @ApiOkResponse({description: 'Subscription price'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async subscriptionPrice() {
        return this.subscriptionService.subscriptionPrice();
    }

    @Put('price')
    @ApiOperation({summary: 'Update subscription price'})
    @ApiOkResponse({description: 'Subscription price updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateSubscriptionPrice(@Headers('authorization') token: string, @Body() body: BodySubscriptionPrice) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.updateSubscriptionPrice(body);
    }

    @Put('rules')
    @ApiOperation({summary: 'Update subscription rules'})
    @ApiOkResponse({description: 'Subscription rules updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateSubscriptionRules(@Headers('authorization') token: string, @Body() body: BodySubscriptionPrice) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.updateSubscriptionRules(body);
    }



    @Put(':id')
    @ApiOperation({summary: 'Update subscription'})
    @ApiOkResponse({description: 'Subscription updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    async updateSubscription(@Headers('authorization') token: string, @Param('id') id: number, @Body() body: BodySubscription) {
        await this.tokenValidation.validateAdminToken(token);
        return this.subscriptionService.updateSubscription(id, body, token);
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


}