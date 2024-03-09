import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {TicketModule} from "./ticket/ticket.module";
import {MessageModule} from "./message/message.module";
import {SubscriptionModule} from "./subscription/subscription.module";
import {LocationModule} from "./location/location.module";
import {FactureModule} from "./facture/facture.module";
import {ServiceModule} from "./service/service.module";
import {ProviderModule} from "./provider/provider.module";
import {LanguageModule} from "./language/language.module";
import {pictureModule} from "./picture/picture.module";

@Module({
    imports: [
        UserModule,
        TicketModule,
        MessageModule,
        SubscriptionModule,
        LocationModule,
        FactureModule,
        ServiceModule,
        ProviderModule,
        LanguageModule,
        pictureModule
    ]
})
export class AppModule {
}