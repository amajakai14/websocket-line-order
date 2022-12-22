import { Body, Controller, Post, Req } from '@nestjs/common';
import { CustomerId } from '../../model/customer-id';
import { MenuAddRequest } from './menu.add.request';

@Controller('admin/menu')
export class MenuController {
  @Post()
  getOrder(@Req() req, @Body() menuAddRequest: MenuAddRequest): string {
    const decoded: CustomerId = req.app.locals.decoded;
    console.log('cusId', decoded.customerId);
    console.log("here's order", menuAddRequest);
    console.log(menuAddRequest.price == null);
    return 'hello from order but you need an Authen';
  }
}
