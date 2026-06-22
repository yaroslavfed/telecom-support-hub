import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TicketEventsModule } from '../ticket-events/ticket-events.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TicketEventsModule, NotificationsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
