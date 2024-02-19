import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {TicketModule} from "./ticket/ticket.module";
import {MessageModule} from "./message/message.module";
import {SubscriptionModule} from "./subscription/subscription.module";
import {LocationModule} from "./location/location.module";

@Module({
    imports: [UserModule, TicketModule, MessageModule, SubscriptionModule, LocationModule]
})
export class AppModule {
}