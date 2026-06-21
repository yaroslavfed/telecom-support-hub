import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DevicesModule } from './devices/devices.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, DevicesModule, TicketsModule],
})
export class AppModule {}
