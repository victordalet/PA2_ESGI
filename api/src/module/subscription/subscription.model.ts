import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BodySubscription {
    @ApiProperty({example: 1, description: 'Subscription id'})
    @IsNumber()
    id?: number;

    @ApiProperty({example: 'email', description: 'Email'})
    @IsString()
    email?: string;

    @ApiProperty({example: 'created_at', description: 'Created at'})
    @IsString()
    created_at?: string;

    @ApiProperty({example: 'updated_at', description: 'Updated at'})
    @IsString()
    updated_at?: string;

    @ApiProperty({example: '10', description: 'Price'})
    @IsNumber()
    price?: number;
}

export class BodySubscriptionPrice {
    @ApiProperty({example: '10', description: 'Price'})
    @IsNumber()
    price: number;

    @ApiProperty({example: 'explorateur', description: 'name'})
    @IsString()
    name: string;

    @ApiProperty({example: 'reduce', description: '1'})
    @IsNumber()
    reduce: number;

    @ApiProperty({example: 'free', description: '0'})
    @IsNumber()
    free: number

}