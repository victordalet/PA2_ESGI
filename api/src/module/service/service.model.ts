import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class ServiceModel {

    @ApiProperty({example: 'service_name', description: 'Service name'})
    @IsString()
    name: string;

    @ApiProperty({example: 'service_description', description: 'Service description'})
    @IsString()
    description: string;

    @ApiProperty({example: 100, description: 'Service price'})
    @IsNumber()
    price: number;

    @ApiProperty({example: 60, description: 'Service duration'})
    @IsNumber()
    duration: number;

    @ApiProperty({example: 'user_email', description: 'Service created by'})
    @IsString()
    created_by: string;

    @ApiProperty({example: 'type', description: 'type of service'})
    @IsString()
    type: string;

}