import { MenuEntity, MenuType } from '../entities/menu.entity';
import { CustomerId } from './customer-id';
import { MenuId } from './menu-id';

export class Menu {
  menuId: MenuId;
  name: string;
  menuType: MenuType;
  price: number;
  customerId: CustomerId;

  constructor(
    menuId: MenuId,
    name: string,
    menuType: MenuType,
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

  toEntity(): MenuEntity {
    const menuEnity = new MenuEntity();
    menuEnity.menu_name = this.name;
    menuEnity.menu_type = this.menuType;
    menuEnity.price = this.price;
    return menuEnity;
  }
}
