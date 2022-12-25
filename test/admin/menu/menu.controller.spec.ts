import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from '../../../src/admin/menu/menu.controller';
import { MenuService } from '../../../src/admin/menu/menu.service';
import { CustomerRepository } from '../../../src/repositories/customer.repository';
import { MenuRepository } from '../../../src/repositories/menu.repository';

describe('MenuController', () => {
  let controller: MenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [MenuService, MenuRepository, CustomerRepository],
    }).compile();

    controller = module.get<MenuController>(MenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
