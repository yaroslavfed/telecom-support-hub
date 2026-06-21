import { Module } from '@nestjs/common';
import { TicketEventsService } from './ticket-events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketEvent, TicketEventSchema } from './schemas/ticket-event.schema';
import { TicketEventsController } from './ticket-events.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TicketEvent.name,
        schema: TicketEventSchema,
      },
    ]),
  ],
  providers: [TicketEventsService],
  exports: [TicketEventsService],
  controllers: [TicketEventsController],
})
export class TicketEventsModule {}
