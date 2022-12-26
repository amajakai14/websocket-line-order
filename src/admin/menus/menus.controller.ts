import { Controller, Get, HttpException, Req } from '@nestjs/common';
import { CustomerId } from '../../model/customer-id';
import { Menu } from '../../model/menu';
import { MenusService } from './menus.service';

@Controller('admin/menus')
export class MenusController {
  constructor(private readonly service: MenusService) {}

  @Get()
  async menus(@Req() req): Promise<Menu[]> {
    const decoded: CustomerId = req.app.locals.decoded;
    const result = await this.service.menusOf(decoded.customerId);
    if (result.result.isBad()) {
      throw new HttpException(
        result.result.errorMessage,
        result.result.httpStatus,
      );
    }
    return result.menus;
  }
}
