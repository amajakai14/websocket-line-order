import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from '../../../src/admin/menu/menu.service';
import { MenuRepository } from '../../../src/repositories/menu.repository';
import { UserRepository } from '../../../src/repositories/user.repository';
import { PrismaService } from './../../../src/prisma/prisma.service';

describe('MenusService', () => {
  let service: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuService, MenuRepository, UserRepository, PrismaService],
    }).compile();

    service = module.get<MenuService>(MenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
