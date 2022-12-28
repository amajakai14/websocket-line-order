import { Module } from '@nestjs/common';
import { TableRepository } from '../../repositories/table.repository';
import { PrismaService } from './../../prisma/prisma.service';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';

@Module({
  controllers: [TablesController],
  providers: [TablesService, TableRepository, PrismaService],
})
export class TablesModule {}
