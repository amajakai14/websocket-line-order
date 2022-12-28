import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from '../../../src/admin/menu/menu.service';
import { CustomerRepository } from '../../../src/repositories/customer.repository';
import { MenuRepository } from '../../../src/repositories/menu.repository';
import { PrismaService } from './../../../src/prisma/prisma.service';

describe('MenusService', () => {
  let service: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        MenuRepository,
        CustomerRepository,
        PrismaService,
      ],
    }).compile();

    service = module.get<MenuService>(MenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
