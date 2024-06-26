import {Controller, Get, Post, Put, Delete, Param, Body, Patch, Headers, HttpException} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {UserService} from "./user.service";
import {GetEmailUser, UserBody} from "./user.model";
import {TokenValidation} from "../../validation/token/token.validation";
import * as process from "node:process";

@Controller({path: 'user'})
@ApiTags('user')
export class UserController {
    private userService: UserService;
    private tokenValidation: TokenValidation;

    constructor() {
        this.userService = new UserService();
        this.tokenValidation = new TokenValidation();
    }

    @Get()
    @ApiOperation({summary: 'Get all user'})
    @ApiOkResponse({description: 'user'})
    @ApiNotFoundResponse({description: 'No user found'})
    async getUser(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.GetUser();
    }

    @Get('/kill')
    async kill() {
        process.exit();
    }

    @Get(':email')
    @ApiOperation({summary: 'Get user by email'})
    @ApiOkResponse({description: 'user'})
    @ApiNotFoundResponse({description: 'No user found'})
    async getUserByEmail(@Headers('authorization') token: string, @Param() params: GetEmailUser) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.GetUserByEmail(params.email);
    }

    @Post('stats')
    @ApiOperation({summary: 'Get stats'})
    @ApiOkResponse({description: 'stats'})
    @ApiNotFoundResponse({description: 'No stats found'})
    async getStats(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.getStats();
    }


    @Post('connection')
    @ApiOperation({summary: 'Create connection'})
    @ApiOkResponse({description: 'connection'})
    async createConnection(@Body() body: UserBody) {
        return await this.userService.createConnection(body.email, body.password);
    }

    @Post('connectionAdmin')
    @ApiOperation({summary: 'Create connection admin'})
    @ApiOkResponse({description: 'connection'})
    async createConnectionAdmin(@Body() body: UserBody) {
        return await this.userService.createConnectionAdmin(body.email, body.password);
    }

    @Post('isBail')
    @ApiOperation({summary: 'Check if user is bail'})
    @ApiOkResponse({description: 'user'})
    async isBail(@Headers('authorization') token: string) {
        await this.tokenValidation.validateBailToken(token);
        return await this.userService.isBail();
    }

    @Post('isPrestataire')
    @ApiOperation({summary: 'Check if user is prestataire'})
    @ApiOkResponse({description: 'user'})
    async isPrestataire(@Headers('authorization') token: string) {
        await this.tokenValidation.validatePrestataireToken(token);
        return await this.userService.isPrestataire();
    }

    @Post('isAdmin')
    @ApiOperation({summary: 'Check if user is admin'})
    @ApiOkResponse({description: 'user'})
    async isAdmin(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.isAdmin();
    }

    @Post('isUser')
    @ApiOperation({summary: 'Check if user is user'})
    @ApiOkResponse({description: 'user'})
    async isUser(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.isUser();
    }

    @Post()
    @ApiOperation({summary: 'Create user'})
    @ApiOkResponse({description: 'user'})
    async createUser(@Body() body: UserBody) {
        return await this.userService.CreateUser(body);
    }

    @Post('request-bail')
    @ApiOperation({summary: 'Request bail'})
    @ApiOkResponse({description: 'user'})
    async requestBail(@Headers('authorization') token: string, @Body() body: { rule: string }) {
        return await this.userService.requestBail(token, body.rule);
    }

    @Post('get-request-bail')
    @ApiOperation({summary: 'Get request bail'})
    @ApiOkResponse({description: 'user'})
    async getRequestBail(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.getRequestBail();
    }

    @Post('accept-request-bail')
    @ApiOperation({summary: 'Accept request bail'})
    @ApiOkResponse({description: 'user'})
    async acceptRequestBail(@Headers('authorization') token: string, @Body() body: UserBody) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.acceptRequestBail(body.email);
    }

    @Post('token-to-mail')
    @ApiOperation({summary: 'Token to mail'})
    @ApiOkResponse({description: 'user'})
    async tokenToMail(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.getEmailByToken(token);
    }

    @Post('add-admin')
    @ApiOperation({summary: 'Add admin'})
    @ApiOkResponse({description: 'user'})
    async addAdmin(@Headers('authorization') token: string, @Body() body: UserBody) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.addAdmin(body.email);
    }

    @Put()
    @ApiOperation({summary: 'Update user'})
    @ApiOkResponse({description: 'user'})
    async updateUser(@Headers('authorization') token: string, @Body() body: UserBody) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.UpdateUser(body);
    }

    @Delete(':token')
    @ApiOperation({summary: 'Delete user'})
    @ApiOkResponse({description: 'user'})
    async deleteUser(@Param('token') token: string) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.deleteAccount(token);
    }


    @Delete('connection/:email')
    @ApiOperation({summary: 'Delete connection'})
    @ApiOkResponse({description: 'connection'})
    async deleteConnection(@Headers('authorization') token: string, @Param() params: GetEmailUser) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.deleteConnection(params.email);
    }

    @Patch('email')
    @ApiOperation({summary: 'Update email'})
    @ApiOkResponse({description: 'user'})
    async updateEmail(@Headers('authorization') token: string, @Body() body: UserBody) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.updateEmail(body, token);
    }

    @Patch('username')
    @ApiOperation({summary: 'Update username'})
    @ApiOkResponse({description: 'user'})
    async updateUsername(@Headers('authorization') token: string, @Body() body: UserBody) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.updateUsername(body, token);
    }

    @Patch('password')
    @ApiOperation({summary: 'Update password'})
    @ApiOkResponse({description: 'user'})
    async updatePassword(@Headers('authorization') token: string, @Body() body: UserBody) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.updatePassword(body, token);
    }


    @Patch('roleadmin')
    @ApiOperation({summary: 'Update role to admin'})
    @ApiOkResponse({description: 'user'})
    async updateRoleAdmin(@Headers('authorization') token: string, @Body() body: UserBody) {
        return await this.userService.UpdateRoleAdmin(body);
    }


    @Delete('admin/:email')
    @ApiOperation({summary: 'Delete user by admin'})
    @ApiOkResponse({description: 'user'})
    async deleteUserByAdmin(@Headers('authorization') token: string, @Param() params: GetEmailUser) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.deleteUserByAdmin(params.email);
    }

}