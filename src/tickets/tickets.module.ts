import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TicketEventsModule } from '../ticket-events/ticket-events.module';

@Module({
  imports: [TicketEventsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
