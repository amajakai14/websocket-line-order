import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { Menu } from '../model/menu';
import { MenuId } from '../model/menu-id';

@Injectable()
export class MenuRepository {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly sessionRepository: Repository<MenuEntity>,
  ) {}

  async createMenuOf(menuEntity: MenuEntity): Promise<void> {
    this.sessionRepository.insert(menuEntity);
  }

  async getMenuListOf(course_id: number): Promise<Menu[]> {
    const menusEntity: MenuEntity[] = await this.sessionRepository.findBy({
      course_id,
    });
    if (menusEntity.length === 0) return [Menu.empty()];
    return menusEntity.map((menuEntity) => this.toMenu(menuEntity));
  }

  toMenu(menuEntity: MenuEntity): Menu {
    return new Menu(
      new MenuId(menuEntity.menu_id),
      menuEntity.menu_name,
      menuEntity.menu_type,
      menuEntity.price,
    );
  }
}
