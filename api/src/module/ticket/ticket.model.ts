import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class BodyTicketMessage {
    @ApiProperty({example: 1, description: 'Ticket id'})
    @IsNumber()
    ticket_id?: number;

    @ApiProperty({example: 'created_by', description: 'Created by'})
    @IsString()
    created_by: string;

    @ApiProperty({example: 'Message', description: 'Message'})
    @IsString()
    message: string;

}

export class BodyTicket {
    @ApiProperty({example: 'Ticket name', description: 'Name of ticket'})
    @IsString()
    name: string;

    @ApiProperty({example: 'Ticket description', description: 'Description of ticket'})
    @IsString()
    description: string;

    @ApiProperty({example: 'open', description: 'Status of ticket'})
    @IsString()
    status: string;

    @ApiProperty({example: 'occupy_by', description: 'Occupy by'})
    @IsString()
    occupy_by: string;

    @ApiProperty({example: 'created_by', description: 'Created by'})
    @IsString()
    created_by?: string;

}

