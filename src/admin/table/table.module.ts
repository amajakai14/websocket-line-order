import { Module } from '@nestjs/common';
import { TableRepository } from '../../repositories/table.repository';
import { PrismaService } from './../../prisma/prisma.service';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
  controllers: [TableController],
  providers: [TableService, TableRepository, PrismaService],
})
export class TableModule {}
