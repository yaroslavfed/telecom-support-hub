import { IsEnum, IsIP, IsNotEmpty, IsString } from 'class-validator';
import { DeviceType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
    @ApiProperty({ example: 'Main office router' })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ enum: DeviceType, example: DeviceType.ROUTER })
    @IsEnum(DeviceType)
    type!: DeviceType;

    @ApiProperty({ example: 'RTR-001' })
    @IsString()
    @IsNotEmpty()
    serialNumber!: string;

    @ApiProperty({ example: '192.168.1.1' })
    @IsIP()
    ipAddress!: string;
}