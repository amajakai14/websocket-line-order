import { HttpStatus, Injectable } from '@nestjs/common';
import { Menu } from '../../model/menu';
import { Result } from '../../model/result';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MenuRepository } from '../../repositories/menu.repository';
import { MenusResponse } from './menu.response';
import { MenuUpdateRequest } from './menu.update.request';

@Injectable()
export class MenuService {
  constructor(
    private repository: MenuRepository,
    private customerRespository: CustomerRepository,
  ) {}

  async menusOf(customerId: number): Promise<MenusResponse> {
    const user = await this.customerRespository.getByCustomerId(customerId);
    if (user.isEmpty()) {
      return new MenusResponse(
        [Menu.empty()],
        Result.BAD(HttpStatus.UNAUTHORIZED, 'no authorization'),
      );
    }
    const menuList = await this.repository.getMenuListOf(customerId);
    return new MenusResponse(menuList, Result.OK());
  }

  async createMenu(customerId: number, menu: Menu): Promise<Result> {
    const customer = await this.customerRespository.getByCustomerId(customerId);

    if (!customer.isValid()) {
      return Result.BAD(HttpStatus.NOT_FOUND, 'customer is not found');
    }

    await this.repository.createMenuOf(menu);
  }

  async updateMenu(
    customerId: number,
    menuId: number,
    request: MenuUpdateRequest,
  ): Promise<Result> {
    const menu: Menu = await this.repository.getMenuOf(menuId, customerId);
    if (menu.isEmpty()) {
      return Result.BAD(HttpStatus.NOT_FOUND, 'menu is not found');
    }
    menu.update(request);

    const success = await this.repository.updateMenuOf(menu);
    if (!success) {
      return Result.BAD(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'unable to update menu',
      );
    }
    return Result.OK();
  }

  async deleteMenu(customerId: number, menuId: number): Promise<Result> {
    const menu: Menu = await this.repository.getMenuOf(menuId, customerId);
    if (menu.isEmpty()) {
      return Result.BAD(HttpStatus.NOT_FOUND, 'menu is not found');
    }

    const success = await this.repository.deleteMenuOf(menuId);
    if (!success) {
      return Result.BAD(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'unable to delete menu',
      );
    }
    return Result.OK();
  }
}
