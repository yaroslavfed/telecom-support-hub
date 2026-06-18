import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateDeviceDto) {
        return this.prisma.device.create({ 
            data: dto 
        });
    }

    async findAll() {
        return this.prisma.device.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async findOne(id: string) {
        const device = await this.prisma.device.findUnique({
            where: { id }
        });

        if (!device) {
            throw new Error(`Device with ID ${id} not found`);
        }

        return device;
    }

    async update(id: string, dto: UpdateDeviceDto) {
        await this.findOne(id);

        return this.prisma.device.update({
            where: { id },
            data: dto
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.device.delete({
            where: { id }
        });
    }
}
