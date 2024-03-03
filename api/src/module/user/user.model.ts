import {ApiProperty} from "@nestjs/swagger";
import {IsString} from 'class-validator';

export class GetEmailUser {
    @ApiProperty({example: 'test@gmail.com', description: 'email of user'})
    @IsString()
    email: string;
}


export class UserBody {
    @ApiProperty({example: 'test@gmail.com', description: 'email of user'})
    @IsString()
    email?: string;

    @ApiProperty({example: 'password', description: 'password_of_user'})
    @IsString()
    password?: string;

    @ApiProperty({example: 'test', description: 'name of user'})
    @IsString()
    name?: string;

    @ApiProperty({example: 'admin', description: 'role of user'})
    @IsString()
    role?: string;

    @ApiProperty({example: '2021-11-02T15:00:00Z', description: 'created_at'})
    @IsString()
    created_at?: string;

    @ApiProperty({example: '2021-11-02T15:00:00Z', description: 'updated_at'})
    @IsString()
    updated_at?: string;

    @ApiProperty({example: '2021-11-02T15:00:00Z', description: 'deleted_at'})
    @IsString()
    deleted_at?: string;

    @ApiProperty({example: 'address', description: 'address of user'})
    @IsString()
    address?: string;

    @ApiProperty({example: 'connection', description: 'connection'})
    @IsString()
    connection?: string;

}
