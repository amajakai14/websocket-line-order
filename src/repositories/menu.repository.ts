import { Injectable } from '@nestjs/common';
import { Menu } from '../model/menu';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuRepository {
  constructor(private prisma: PrismaService) {}

  async createMenuOf(menu: Menu): Promise<boolean> {
    const result = await this.prisma.tbl_menu.create({
      data: {
        menu_name: menu.name,
        menu_type: menu.menuType,
        price: menu.price,
        available: menu.available,
        user: {
          connect: { id: menu.userId },
        },
      },
    });
    return result != null;
  }

  async updateMenuOf(menu: Menu): Promise<boolean> {
    const result = await this.prisma.tbl_menu.update({
      where: { id: menu.menuId },
      data: {
        menu_name: menu.name,
        menu_type: menu.menuType,
        available: menu.available,
        price: menu.price,
        updated_at: new Date(),
      },
    });
    return result != null;
  }

  async deleteMenuOf(id: number, user_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_menu.deleteMany({
      where: { id, user_id },
    });
    return result.count !== 0;
  }

  async getMenuListOf(user_id: number): Promise<Menu[]> {
    const result = await this.prisma.tbl_menu.findMany({
      where: { user_id },
    });
    if (result == null) return [Menu.empty()];
    return result.map((menuTable) => Menu.of(menuTable));
  }

  async getMenuOf(id: number, user_id: number): Promise<Menu> {
    const result = await this.prisma.tbl_menu.findFirst({
      where: { id, user_id },
    });
    if (result == null) return Menu.empty();
    return Menu.of(result);
  }
}
