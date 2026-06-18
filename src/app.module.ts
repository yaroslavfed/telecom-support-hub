import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DevicesModule } from './devices/devices.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, DevicesModule, UsersModule, AuthModule],
})
export class AppModule {}
