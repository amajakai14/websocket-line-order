import { tbl_menu } from '@prisma/client';
import { MenuEntity, MenuType } from '../entities/menu.entity';
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
    return new Menu(
      MenuId.empty(),
      '',
      MenuType.INVALID,
      -1,
      CustomerId.empty(),
    );
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

  toEntity(): MenuEntity {
    const menuEnity = new MenuEntity();
    menuEnity.menu_name = this.name;
    menuEnity.menu_type = this.menuType;
    menuEnity.price = this.price;
    return menuEnity;
  }
}
