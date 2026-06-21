import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

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

    return this.prisma.ticket.create({
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
      include: {
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
      },
    });
  }
  findAll() {
    return this.prisma.ticket.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
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
      },
    });
  }

  async findOne(id: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
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
      },
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
      include: {
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
      },
    });
  }

  async updateStatus(id: string, dto: UpdateTicketStatusDto) {
    await this.findOne(id);

    return this.prisma.ticket.update({
      where: { id },
      data: {
        status: dto.status,
      },
      include: {
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
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
