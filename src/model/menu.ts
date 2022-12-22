import { MenuEntity, MenuType } from '../entities/menu.entity';

export class Menu {
  name: string;
  menuType: MenuType;
  price: number;

  constructor(name: string, menuType: MenuType, price: number) {
    this.name = name;
    this.menuType = menuType;
    this.price = price;
  }

  toEntity(): MenuEntity {
    const menuEnity = new MenuEntity();
    menuEnity.menu_name = this.name;
    menuEnity.menu_type = this.menuType;
    menuEnity.price = this.price;
    return menuEnity;
  }
}
