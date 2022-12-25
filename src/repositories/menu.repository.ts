import { Injectable } from '@nestjs/common';
import { dataSource } from '../config/typeorm.datasource';
import { MenuEntity } from '../entities/menu.entity';
import { CustomerId } from '../model/customer-id';
import { Menu } from '../model/menu';
import { MenuId } from '../model/menu-id';

@Injectable()
export class MenuRepository {
  async createMenuOf(menuEntity: MenuEntity): Promise<void> {
    await dataSource.manager.insert(MenuEntity, menuEntity);
  }

  async getMenuListOf(customer_id: number): Promise<Menu[]> {
    const menusEntity: MenuEntity[] = await dataSource.manager.findBy(
      MenuEntity,
      { customer_id },
    );
    if (menusEntity.length === 0) return [Menu.empty()];
    return menusEntity.map((menuEntity) => this.toMenu(menuEntity));
  }

  toMenu(menuEntity: MenuEntity): Menu {
    return new Menu(
      new MenuId(menuEntity.menu_id),
      menuEntity.menu_name,
      menuEntity.menu_type,
      menuEntity.price,
      new CustomerId(menuEntity.customer_id),
    );
  }
}
