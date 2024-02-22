import {IsBoolean, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LocationModel {
    @ApiProperty({type: 'number', description: 'Location id'})
    @IsNumber()
    id: number;

    @ApiProperty({type: 'string', description: 'Location name'})
    @IsString()
    name: string;

    @ApiProperty({type: 'string', description: 'Location picture'})
    @IsString()
    picture: string;

    @ApiProperty({type: 'string', description: 'Location description'})
    @IsString()
    description: string;

    @ApiProperty({type: 'boolean', description: 'Location accepted'})
    @IsBoolean()
    accepted: boolean;

    @ApiProperty({type: 'string', description: 'Location address'})
    @IsString()
    address: string;

    @ApiProperty({type: 'number', description: 'Location latitude'})
    @IsNumber()
    latitude: number;

    @ApiProperty({type: 'number', description: 'Location longitude'})
    @IsNumber()
    longitude: number;

    @ApiProperty({type: 'number', description: 'Location capacity'})
    @IsNumber()
    capacity: number;

    @ApiProperty({type: 'number', description: 'Location price'})
    @IsNumber()
    price: number;

    @ApiProperty({type: 'string', description: 'Location type'})
    @IsString()
    type: string;


}