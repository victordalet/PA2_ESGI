import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class TypeLocationModel {

    @ApiProperty({example: '1', description: 'id of type location'})
    @IsNumber()
    id?: number;

    @ApiProperty({example: 'type_location', description: 'type location'})
    @IsString()
    type_location?: string;

}