import { Test, TestingModule } from '@nestjs/testing';
import { MenusService } from '../../../src/admin/menus/menus.service';
import { CustomerRepository } from '../../../src/repositories/customer.repository';
import { MenuRepository } from '../../../src/repositories/menu.repository';

describe('MenusService', () => {
  let service: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenusService, MenuRepository, CustomerRepository],
    }).compile();

    service = module.get<MenusService>(MenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
