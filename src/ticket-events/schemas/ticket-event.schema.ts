import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TicketEventDocument = HydratedDocument<TicketEvent>;

@Schema({ timestamps: true })
export class TicketEvent {
  @Prop({ required: true })
  ticketId!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  message!: string;

  @Prop({ type: Object })
  metadata?: Record<string, unknown>;
}

export const TicketEventSchema = SchemaFactory.createForClass(TicketEvent);
