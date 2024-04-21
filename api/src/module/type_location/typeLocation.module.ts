import { Module } from '@nestjs/common';
import {TypeLocationController} from "./typeLocation.controller";

@Module({
    controllers: [TypeLocationController]
})
export class TypeLocationModule {}