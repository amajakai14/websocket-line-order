import { MenuEntity, MenuType } from '../entities/menu.entity';
import { MenuId } from './menu-id';

export class Menu {
  menuId: MenuId;
  name: string;
  menuType: MenuType;
  price: number;

  constructor(menuId: MenuId, name: string, menuType: MenuType, price: number) {
    this.menuId = menuId;
    this.name = name;
    this.menuType = menuType;
    this.price = price;
  }

  static empty() {
    return new Menu(MenuId.empty(), '', MenuType.INVALID, -1);
  }

  toEntity(): MenuEntity {
    const menuEnity = new MenuEntity();
    menuEnity.menu_name = this.name;
    menuEnity.menu_type = this.menuType;
    menuEnity.price = this.price;
    return menuEnity;
  }
}
