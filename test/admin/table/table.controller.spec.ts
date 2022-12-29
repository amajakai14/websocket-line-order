import { Test, TestingModule } from '@nestjs/testing';
import { TableController } from '../../../src/admin/table/table.controller';
import { TableService } from '../../../src/admin/table/table.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { TableRepository } from '../../../src/repositories/table.repository';

describe('TableController', () => {
  let controller: TableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableController],
      providers: [TableService, TableRepository, PrismaService],
    }).compile();

    controller = module.get<TableController>(TableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
