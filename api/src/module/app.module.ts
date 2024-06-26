import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {TicketModule} from "./ticket/ticket.module";
import {MessageModule} from "./message/message.module";
import {SubscriptionModule} from "./subscription/subscription.module";
import {LocationModule} from "./location/location.module";
import {FactureModule} from "./facture/facture.module";
import {ServiceModule} from "./service/service.module";
import {LanguageModule} from "./language/language.module";
import {PictureModule} from "./picture/picture.module";
import {FileModule} from "./file/file.module";
import {JobModule} from "./job/job.module";
import {TypeLocationModule} from "./type_location/typeLocation.module";

@Module({
    imports: [
        UserModule,
        TicketModule,
        MessageModule,
        SubscriptionModule,
        LocationModule,
        FactureModule,
        ServiceModule,
        LanguageModule,
        PictureModule,
        FileModule,
        JobModule,
        TypeLocationModule
    ]
})
export class AppModule {
}