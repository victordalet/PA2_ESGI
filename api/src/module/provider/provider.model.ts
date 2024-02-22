import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsString} from "class-validator";

export class ProviderModel {
    @ApiProperty({example: 'name', description: 'name of the provider'})
    @IsString()
    name: string;

    @ApiProperty({example: 'description', description: 'description of the provider'})
    @IsString()
    description: string;

    @ApiProperty({example: 'accepted', description: 'accepted status of the provider'})
    @IsBoolean()
    accepted?: boolean;

    @ApiProperty({example: 'created_by', description: 'created by of the provider'})
    @IsString()
    created_by: string;
}