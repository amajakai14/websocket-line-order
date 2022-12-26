import { tbl_menu } from '@prisma/client';
import { CustomerId } from './customer-id';
import { MenuId } from './menu-id';

export class Menu {
  menuId!: MenuId;
  name!: string;
  menuType!: string;
  price!: number;
  customerId!: CustomerId;

  constructor(
    menuId: MenuId,
    name: string,
    menuType: string,
    price: number,
    customerId: CustomerId,
  ) {
    this.menuId = menuId;
    this.name = name;
    this.menuType = menuType;
    this.price = price;
    this.customerId = customerId;
  }

  static empty() {
    return new Menu(MenuId.empty(), '', 'INVALID', -1, CustomerId.empty());
  }

  static of(menuTable: tbl_menu) {
    return new Menu(
      new MenuId(menuTable.id),
      menuTable.menu_name,
      menuTable.menu_type,
      menuTable.price,
      new CustomerId(menuTable.customer_id),
    );
  }
}
