import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PictureModel {
    @ApiProperty({type: 'string', description: 'Picture base 64'})
    @IsString()
    picture: string;
}