import {Module} from '@nestjs/common';
import {FactureController} from "./facture.controller";

@Module({
    controllers: [FactureController]
})
export class FactureModule {
}