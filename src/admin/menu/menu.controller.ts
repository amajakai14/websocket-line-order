import { Body, Controller, Post, Req } from '@nestjs/common';
import { CustomerId } from '../../model/customer-id';
import { Menu } from '../../model/menu';
import { MenuId } from './../../model/menu-id';
import { MenuAddRequest } from './menu.add.request';
import { MenuService } from './menu.service';

@Controller('admin/menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}
  @Post()
  getOrder(@Req() req, @Body() menuAddRequest: MenuAddRequest): string {
    const decoded: CustomerId = req.app.locals.decoded;
    console.log('body', menuAddRequest);
    this.service.createMenu(decoded, this.toMenu(menuAddRequest));

    return 'hello from order but you need an Authen';
  }

  toMenu(req: MenuAddRequest): Menu {
    const price = req.price == null ? 0 : req.price;
    return new Menu(
      MenuId.empty(),
      req.menu_name,
      req.menu_type,
      price,
      CustomerId.empty(),
    );
  }
}
