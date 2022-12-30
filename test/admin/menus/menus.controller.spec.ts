import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from '../../../src/admin/menu/menu.controller';
import { MenuService } from '../../../src/admin/menu/menu.service';
import { MenuRepository } from '../../../src/repositories/menu.repository';
import { UserRepository } from '../../../src/repositories/user.repository';
import { PrismaService } from './../../../src/prisma/prisma.service';

describe('MenusController', () => {
  let controller: MenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [MenuService, MenuRepository, UserRepository, PrismaService],
    }).compile();

    controller = module.get<MenuController>(MenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
