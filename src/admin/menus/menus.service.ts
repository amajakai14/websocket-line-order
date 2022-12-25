import { Injectable } from '@nestjs/common';
import { Menu } from '../../model/menu';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MenuRepository } from '../../repositories/menu.repository';

@Injectable()
export class MenusService {
  constructor(
    private readonly repository: MenuRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}
  async menusOf(customerId: number): Promise<Menu[]> {
    const user = await this.customerRepository.getByCustomerId(customerId);
    console.log('user', user);
    if (user.isValid()) {
      return [Menu.empty()];
    }
    return await this.repository.getMenuListOf(customerId);
  }
}
