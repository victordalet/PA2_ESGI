import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class BodyMessage {
    @ApiProperty({example: 1, description: 'Message id'})
    @IsNumber()
    id?: number;

    @ApiProperty({example: 'mail_from', description: 'Mail from'})
    @IsString()
    mail_from?: string;

    @ApiProperty({example: 'mail_to', description: 'Mail to'})
    @IsString()
    mail_to?: string;

    @ApiProperty({example: 'subject', description: 'Subject'})
    @IsString()
    message?: string;

    @ApiProperty({example: 'created_at', description: 'Created at'})
    @IsString()
    created_at?: string;

    @ApiProperty({example: 'updated_at', description: 'Updated at'})
    @IsString()
    updated_at?: string;

    @ApiProperty({example: 'deleted_at', description: 'Deleted at'})
    @IsString()
    deleted_at?: string;

}