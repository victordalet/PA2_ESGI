import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class FactureModel {
    @ApiProperty({type: 'string', description: 'Facture by'})
    @IsString()
    created_by: string;

    @ApiProperty({type: 'string', description: 'Facture name'})
    @IsString()
    name: string;

    @ApiProperty({type: 'string', description: 'Facture description'})
    @IsString()
    description: string;

    @ApiProperty({type: 'number', description: 'Facture price'})
    @IsNumber()
    price: number;

    @ApiProperty({type: 'number', description: 'Facture duration'})
    @IsNumber()
    duration: number;

    @ApiProperty({type: 'string', description: 'Facture type'})
    @IsString()
    type: string;

    @ApiProperty({type: 'number', description: 'Facture notation'})
    @IsNumber()
    notification: number;

    @ApiProperty({type: 'number', description: 'Facture notification interval'})
    @IsNumber()
    notification_interval: number;

}