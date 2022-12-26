import { tbl_menu } from '@prisma/client';

export class Menu {
  menuId!: number;
  name!: string;
  menuType!: string;
  price!: number;
  customerId!: number;

  constructor(
    menuId: number,
    name: string,
    menuType: string,
    price: number,
    customerId: number,
  ) {
    this.menuId = menuId;
    this.name = name;
    this.menuType = menuType;
    this.price = price;
    this.customerId = customerId;
  }

  static empty(): Menu {
    return new Menu(-1, '', 'INVALID', -1, -1);
  }

  isEmpty(): boolean {
    return this === Menu.empty();
  }

  static of(menuTable: tbl_menu) {
    return new Menu(
      menuTable.id,
      menuTable.menu_name,
      menuTable.menu_type,
      menuTable.price,
      menuTable.customer_id,
    );
  }
}
