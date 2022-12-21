import { Body, Controller, Get, Req } from '@nestjs/common';
import { OrderAddRequest } from './order.add.request';

@Controller('order')
export class OrderController {
  @Get()
  getOrder(@Req() req, @Body() orderAddRequest: OrderAddRequest): string {
    const decoded = req.app.locals.decoded;
    console.log('decoded from controller: ', decoded);
    console.log("here's order", orderAddRequest);
    console.log(orderAddRequest.price == null);
    return 'hello from order but you need an Authen';
  }
}
