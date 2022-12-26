import { HttpStatus, Injectable } from '@nestjs/common';
import { Menu } from '../../model/menu';
import { Result } from '../../model/result';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MenuRepository } from '../../repositories/menu.repository';
import { MenusResponse } from './menus.response';

@Injectable()
export class MenusService {
  constructor(
    private readonly repository: MenuRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}
  async menusOf(customerId: number): Promise<MenusResponse> {
    const user = await this.customerRepository.getByCustomerId(customerId);
    if (user.isEmpty()) {
      return new MenusResponse(
        [Menu.empty()],
        Result.BAD(HttpStatus.UNAUTHORIZED, 'no authorization'),
      );
    }
    const menuList = await this.repository.getMenuListOf(customerId);
    return new MenusResponse(menuList, Result.OK());
  }
}
