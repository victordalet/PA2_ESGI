import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {TicketModule} from "./ticket/ticket.module";
import {MessageModule} from "./message/message.module";
import {SubscriptionModule} from "./subscription/subscription.module";

@Module({
    imports: [UserModule, TicketModule, MessageModule, SubscriptionModule]
})
export class AppModule {
}