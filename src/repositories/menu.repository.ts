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
        customer_id: menu.customerId.value(),
      },
    });
    return !(result == null);
  }

  async getMenuListOf(customer_id: number): Promise<Menu[]> {
    const result = await this.prisma.tbl_menu.findMany({
      where: { customer_id },
    });
    if (result == null) return [Menu.empty()];
    return result.map((menuTable) => Menu.of(menuTable));
  }
}
