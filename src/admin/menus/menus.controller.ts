import { Controller, Get, Req } from '@nestjs/common';
import { CustomerId } from '../../model/customer-id';
import { Menu } from '../../model/menu';
import { MenusService } from './menus.service';

@Controller('admin/menus')
export class MenusController {
  constructor(private readonly service: MenusService) {}

  @Get()
  async menus(@Req() req): Promise<Menu[]> {
    const decoded: CustomerId = req.app.locals.decoded;
    return await this.service.menusOf(decoded.customerId);
  }
}
