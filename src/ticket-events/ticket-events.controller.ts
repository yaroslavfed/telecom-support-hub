import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { TicketEventsService } from './ticket-events.service';

@ApiTags('Ticket-events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ticket-events')
export class TicketEventsController {
  constructor(private readonly ticketEventsService: TicketEventsService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.VIEWER)
  findEvents(@Param('id') id: string) {
    return this.ticketEventsService.findByTicketId(id);
  }
}
