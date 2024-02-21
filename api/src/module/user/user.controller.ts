import {Controller, Get, Post, Put, Delete, Param, Body, Patch} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {UserService} from "./user.service";
import {GetEmailUser, UserBody} from "./user.model";

@Controller({path: 'user'})
@ApiTags('user')
export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    @Get()
    @ApiOperation({summary: 'Get all user'})
    @ApiOkResponse({description: 'user'})
    @ApiNotFoundResponse({description: 'No user found'})
    async getUser() {
        return await this.userService.GetUser();
    }

    @Get(':email')
    @ApiOperation({summary: 'Get user by email'})
    @ApiOkResponse({description: 'user'})
    @ApiNotFoundResponse({description: 'No user found'})
    async getUserByEmail(@Param() params: GetEmailUser) {
        return await this.userService.GetUserByEmail(params.email);
    }


    @Post('connection')
    @ApiOperation({summary: 'Create connection'})
    @ApiOkResponse({description: 'connection'})
    async createConnection(@Body() body: UserBody) {
        return await this.userService.createConnection(body.email, body.password);
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
    async updateUser(@Body() body: UserBody) {
        return await this.userService.UpdateUser(body);
    }

    @Delete(':email')
    @ApiOperation({summary: 'Delete user'})
    @ApiOkResponse({description: 'user'})
    async deleteUser(@Param() params: GetEmailUser) {
        return await this.userService.DeleteUser(params.email);
    }

    @Delete('connection/:email')
    @ApiOperation({summary: 'Delete connection'})
    @ApiOkResponse({description: 'connection'})
    async deleteConnection(@Param() params: GetEmailUser) {
        return await this.userService.deleteConnection(params.email);
    }

    @Patch('password')
    @ApiOperation({summary: 'Update password'})
    @ApiOkResponse({description: 'user'})
    async updatePassword(@Body() body: UserBody) {
        return await this.userService.UpdatePassword(body);
    }

    @Patch('role')
    @ApiOperation({summary: 'Update role'})
    @ApiOkResponse({description: 'user'})
    async updateRole(@Body() body: UserBody) {
        return await this.userService.UpdateRole(body);
    }

    @Patch('roleadmin')
    @ApiOperation({summary: 'Update role to admin'})
    @ApiOkResponse({description: 'user'})
    async updateRoleAdmin(@Body() body: UserBody) {
        return await this.userService.UpdateRoleAdmin(body);
    }

}