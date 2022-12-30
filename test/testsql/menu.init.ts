import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from '../../src/prisma/prisma.service';

const data = [
  {
    id: 1,
    menu_name: 'wagyu',
    menu_type: 'MAIN',
    price: 0,
    available: true,
    user_id: 2,
  },
  {
    id: 2,
    menu_name: 'kurobuta',
    menu_type: 'MAIN',
    price: 0,
    available: true,
    user_id: 2,
  },
  {
    id: 3,
    menu_name: 'brownie',
    menu_type: 'DESSERT',
    price: 0,
    available: true,
    user_id: 2,
  },
];

@Injectable()
export class MenuMockData {
  constructor(private readonly prisma: PrismaService) {}

  async add() {
    await this.prisma.tbl_menu.createMany({ data });
  }
}
