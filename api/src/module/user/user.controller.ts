import {Controller, Get, Post, Put, Delete, Param, Body, Patch, Headers, HttpException} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {UserService} from "./user.service";
import {GetEmailUser, UserBody} from "./user.model";
import {TokenValidation} from "../../validation/token/token.validation";

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
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.GetUser();
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

    @Post('isAdmin')
    @ApiOperation({summary: 'Check if user is admin'})
    @ApiOkResponse({description: 'user'})
    async isAdmin(@Headers('authorization') token: string) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.isAdmin(token);
    }

    @Post('isUser')
    @ApiOperation({summary: 'Check if user is user'})
    @ApiOkResponse({description: 'user'})
    async isUser(@Headers('authorization') token: string) {
        await this.tokenValidation.validateToken(token);
        return await this.userService.isUser(token);
    }

    @Post()
    @ApiOperation({summary: 'Create user'})
    @ApiOkResponse({description: 'user'})
    async createUser(@Body() body: UserBody) {
        return await this.userService.CreateUser(body);
    }

    @Put()
    @ApiOperation({summary: 'Update user'})
    @ApiOkResponse({description: 'user'})
    async updateUser(@Headers('authorization') token: string, @Body() body: UserBody) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.UpdateUser(body);
    }

    @Delete(':email')
    @ApiOperation({summary: 'Delete user'})
    @ApiOkResponse({description: 'user'})
    async deleteUser(@Headers('authorization') token: string, @Param() params: GetEmailUser) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.DeleteUser(params.email);
    }

    @Delete('connection/:email')
    @ApiOperation({summary: 'Delete connection'})
    @ApiOkResponse({description: 'connection'})
    async deleteConnection(@Headers('authorization') token: string, @Param() params: GetEmailUser) {
        await this.tokenValidation.validateAdminToken(token);
        return await this.userService.deleteConnection(params.email);
    }

    @Patch('password')
    @ApiOperation({summary: 'Update password'})
    @ApiOkResponse({description: 'user'})
    async updatePassword(@Headers('authorization') token: string, @Body() body: UserBody) {
        return await this.userService.UpdatePassword(body);
    }

    @Patch('role')
    @ApiOperation({summary: 'Update role'})
    @ApiOkResponse({description: 'user'})
    async updateRole(@Headers('authorization') token: string, @Body() body: UserBody) {
        return await this.userService.UpdateRole(body);
    }

    @Patch('roleadmin')
    @ApiOperation({summary: 'Update role to admin'})
    @ApiOkResponse({description: 'user'})
    async updateRoleAdmin(@Headers('authorization') token: string, @Body() body: UserBody) {
        return await this.userService.UpdateRoleAdmin(body);
    }


}