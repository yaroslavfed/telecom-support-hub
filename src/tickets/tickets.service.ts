import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketEventsService } from '../ticket-events/ticket-events.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { GetTicketsDto } from './dto/get-tickets.dto';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketEventsService: TicketEventsService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  private readonly ticketInclude = {
    device: true,
    createdByUser: {
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    },
    assignedToUser: {
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    },
  };

  async create(dto: CreateTicketDto, createdByUserId: string) {
    const device = await this.prisma.device.findUnique({
      where: {
        id: dto.deviceId,
      },
    });

    if (!device) {
      throw new NotFoundException(`Device with id '${dto.deviceId}' was not found`);
    }

    if (dto.assignedToUserId) {
      const assignedUser = await this.prisma.user.findUnique({
        where: { id: dto.assignedToUserId },
      });

      if (!assignedUser) {
        throw new NotFoundException(`User with id '${dto.assignedToUserId}' was not found`);
      }
    }

    const ticket = await this.prisma.ticket.create({
      data: {
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        device: {
          connect: { id: dto.deviceId },
        },
        createdByUser: {
          connect: { id: createdByUserId },
        },
        ...(dto.assignedToUserId && {
          assignedToUser: {
            connect: { id: dto.assignedToUserId },
          },
        }),
      },
      include: this.ticketInclude,
    });

    await this.ticketEventsService.create(ticket.id, 'TICKET_CREATED', 'Ticket was created', {
      createdByUserId,
      deviceId: dto.deviceId,
      assignedToUserId: dto.assignedToUserId,
    });

    this.notificationsGateway.notifyTicketCreated(ticket);

    return ticket;
  }
  async findAll(query: GetTicketsDto) {
    const skip = (query.page - 1) * query.pageSize;

    const where = {
      ...(query.status && {
        status: query.status,
      }),
      ...(query.priority && {
        priority: query.priority,
      }),
    };

    const [items, total] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        skip,
        take: query.pageSize,
        include: this.ticketInclude,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.ticket.count({
        where,
      }),
    ]);

    return {
      items,
      total,
      page: query.page,
      pageSize: query.pageSize,
    };
  }

  async findOne(id: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: this.ticketInclude,
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with id '${id}' was not found`);
    }

    return ticket;
  }

  async update(id: string, dto: UpdateTicketDto) {
    await this.findOne(id);

    return this.prisma.ticket.update({
      where: { id },
      data: dto,
      include: this.ticketInclude,
    });
  }

  async updateStatus(id: string, dto: UpdateTicketStatusDto) {
    const currentTicket = await this.findOne(id);

    const ticket = await this.prisma.ticket.update({
      where: { id },
      data: {
        status: dto.status,
      },
      include: this.ticketInclude,
    });

    await this.ticketEventsService.create(
      ticket.id,
      'STATUS_CHANGED',
      'Ticket status was changed',
      {
        oldStatus: currentTicket.status,
        newStatus: dto.status,
      },
    );

    this.notificationsGateway.notifyTicketStatusChanged({
      ticketId: ticket.id,
      oldStatus: currentTicket.status,
      newStatus: dto.status,
      ticket,
    });

    return ticket;
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
