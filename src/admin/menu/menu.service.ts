import { HttpStatus, Injectable } from '@nestjs/common';
import { Menu } from '../../model/menu';
import { Result } from '../../model/result';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MenuRepository } from '../../repositories/menu.repository';
import { MenuUpdateRequest } from './menu.update.request';

@Injectable()
export class MenuService {
  constructor(
    private menuRepository: MenuRepository,
    private customerRespository: CustomerRepository,
  ) {}

  async createMenu(customerId: number, menu: Menu): Promise<Result> {
    const customer = await this.customerRespository.getByCustomerId(customerId);

    if (!customer.isValid()) {
      return Result.BAD(HttpStatus.NOT_FOUND, 'customer is not found');
    }

    await this.menuRepository.createMenuOf(menu);
  }

  async updateMenu(
    customerId: number,
    menuId: number,
    request: MenuUpdateRequest,
  ): Promise<Result> {
    const menu: Menu = await this.menuRepository.getMenuOf(menuId, customerId);
    if (menu.isEmpty()) {
      return Result.BAD(HttpStatus.NOT_FOUND, 'menu is not found');
    }
    menu.update(request);

    const success = await this.menuRepository.updateMenuOf(menu);
    if (!success) {
      return Result.BAD(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'unable to update menu',
      );
    }
    return Result.OK();
  }
}
