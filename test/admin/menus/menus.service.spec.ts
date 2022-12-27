import { Test, TestingModule } from '@nestjs/testing';
import { MenusService } from '../../../src/admin/menus/menus.service';
import { CustomerRepository } from '../../../src/repositories/customer.repository';
import { MenuRepository } from '../../../src/repositories/menu.repository';
import { PrismaService } from './../../../src/prisma/prisma.service';

describe('MenusService', () => {
  let service: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        MenuRepository,
        CustomerRepository,
        PrismaService,
      ],
    }).compile();

    service = module.get<MenusService>(MenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
