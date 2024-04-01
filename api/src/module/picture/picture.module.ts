import {Module} from '@nestjs/common';
import {PictureController} from "./picture.controller";

@Module({
    controllers: [PictureController]
})
export class PictureModule {
}