import { Injectable } from '@nestjs/common';
import { TicketEvent, TicketEventDocument } from './schemas/ticket-event.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TicketEventsService {
  constructor(
    @InjectModel(TicketEvent.name)
    private readonly ticketEventModel: Model<TicketEventDocument>,
  ) {}

  create(ticketId: string, type: string, message: string, metadata?: Record<string, unknown>) {
    return this.ticketEventModel.create({
      ticketId,
      type,
      message,
      metadata,
    });
  }

  findByTicketId(ticketId: string) {
    return this.ticketEventModel.find({ ticketId }).sort({ createdAt: -1 }).exec();
  }
}
