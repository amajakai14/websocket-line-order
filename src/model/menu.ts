import { tbl_menu } from '@prisma/client';
import { MenuUpdateRequest } from '../admin/menu/menu.update.request';

export class Menu {
  menuId!: number;
  name!: string;
  menuType!: string;
  price!: number;
  customerId!: number;
  available!: boolean;

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
    this.available = true;
  }

  static empty(): Menu {
    const empty = new Menu(-1, '', 'INVALID', -1, -1);
    empty.available = false;
    return empty;
  }

  isEmpty(): boolean {
    return (
      this.menuId === -1 &&
      this.name === '' &&
      this.menuType === 'INVALID' &&
      this.price === -1 &&
      !this.available
    );
  }

  update(req: MenuUpdateRequest) {
    if (req.menu_name != null) this.name = req.menu_name;
    if (req.menu_type != null) this.menuType = req.menu_type;
    if (req.price != null) this.price = req.price;
    if (req.available != null) this.available = req.available;
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
