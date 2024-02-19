import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {BodySubscription} from "./subscription.model";
import {SubscriptionService} from "./subscription.service";

@Controller({path: 'subscription'})
@ApiTags('Subscription')
export class SubscriptionController {
    private subscriptionService: SubscriptionService;

    constructor() {
        this.subscriptionService = new SubscriptionService();
    }

    @Get()
    @ApiOperation({summary: 'Get multiple subscriptions'})
    @ApiOkResponse({description: 'List of subscriptions'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    getSubscriptions() {
        return this.subscriptionService.getSubscriptions();
    }

    @Post()
    @ApiOperation({summary: 'Create subscription'})
    @ApiCreatedResponse({description: 'Subscription created'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    createSubscription(@Body() body: BodySubscription) {
        return this.subscriptionService.createSubscription(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update subscription'})
    @ApiOkResponse({description: 'Subscription updated'})
    @ApiBadRequestResponse({description: 'Request body is not valid'})
    updateSubscription(@Param('id') id: number, @Body() body: BodySubscription) {
        return this.subscriptionService.updateSubscription(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete subscription'})
    @ApiOkResponse({description: 'Subscription deleted'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    deleteSubscription(@Param('id') id: number) {
        return this.subscriptionService.deleteSubscription(id);
    }

    @Get(':email')
    @ApiOperation({summary: 'Check if user is subscribed'})
    @ApiOkResponse({description: 'User is subscribed'})
    @ApiBadRequestResponse({description: 'Request param is not valid'})
    userIsSubscribed(@Param('email') email: string) {
        return this.subscriptionService.userIsSubscribed(email);
    }
}