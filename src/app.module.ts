import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DevicesModule } from './devices/devices.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketEventsModule } from './ticket-events/ticket-events.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL ?? 'mongodb://localhost:27017/telecom_support'),
    PrismaModule,
    UsersModule,
    AuthModule,
    DevicesModule,
    TicketsModule,
    TicketEventsModule,
  ],
})
export class AppModule {}
