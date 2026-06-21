import { ApiProperty } from '@nestjs/swagger';
import { TicketPriority } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ example: 'Router is unavailable' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Main office router stopped responding' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ enum: TicketPriority, example: TicketPriority.HIGH })
  @IsEnum(TicketPriority)
  priority!: TicketPriority;

  @ApiProperty({ example: 'device-uuid-here' })
  @IsUUID()
  deviceId!: string;

  @ApiProperty({ example: 'engineer-user-uuid-here', required: false })
  @IsOptional()
  @IsUUID()
  assignedToUserId?: string;
}
