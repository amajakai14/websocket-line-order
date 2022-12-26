import { Injectable } from '@nestjs/common';
import { CustomerId } from '../../model/customer-id';
import { Menu } from '../../model/menu';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MenuRepository } from '../../repositories/menu.repository';

@Injectable()
export class MenuService {
  constructor(
    private menuRepository: MenuRepository,
    private customerRespository: CustomerRepository,
  ) {}

  async createMenu(customerId: CustomerId, menu: Menu): Promise<void> {
    const customer = await this.customerRespository.getByCustomerId(
      customerId.customerId,
    );

    if (!customer.isValid()) {
      console.log('No cus exist');
    }

    console.log('creating new menu');
    await this.menuRepository.createMenuOf(await menu);
  }
}
