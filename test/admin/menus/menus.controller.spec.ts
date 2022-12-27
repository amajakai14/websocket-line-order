import { Test, TestingModule } from '@nestjs/testing';
import { MenusController } from '../../../src/admin/menus/menus.controller';
import { MenusService } from '../../../src/admin/menus/menus.service';
import { CustomerRepository } from '../../../src/repositories/customer.repository';
import { MenuRepository } from '../../../src/repositories/menu.repository';
import { PrismaService } from './../../../src/prisma/prisma.service';

describe('MenusController', () => {
  let controller: MenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenusController],
      providers: [
        MenusService,
        MenuRepository,
        CustomerRepository,
        PrismaService,
      ],
    }).compile();

    controller = module.get<MenusController>(MenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
