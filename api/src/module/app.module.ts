import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {TicketModule} from "./ticket/ticket.module";
import {MessageModule} from "./message/message.module";

@Module({
    imports: [UserModule, TicketModule, MessageModule]
})
export class AppModule {
}