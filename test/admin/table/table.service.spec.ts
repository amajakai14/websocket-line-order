import { Test, TestingModule } from '@nestjs/testing';
import { TableService } from '../../../src/admin/table/table.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { TableRepository } from '../../../src/repositories/table.repository';

describe('TableService', () => {
  let service: TableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableService, TableRepository, PrismaService],
    }).compile();

    service = module.get<TableService>(TableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
