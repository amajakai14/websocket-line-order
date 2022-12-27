import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CustomerId } from '../../model/customer-id';
import { Menu } from '../../model/menu';
import { MenuAddRequest } from './menu.add.request';
import { MenuService } from './menu.service';
import { MenuUpdateRequest } from './menu.update.request';

@Controller('admin/menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}
  @Post()
  async createMenu(
    @Req() req,
    @Body() menuAddRequest: MenuAddRequest,
  ): Promise<void> {
    const decoded: CustomerId = req.app.locals.decoded;
    await this.service.createMenu(
      decoded.customerId,
      this.toMenu(menuAddRequest, decoded),
    );
  }

  toMenu(req: MenuAddRequest, customerId: CustomerId): Menu {
    const price = req.price == null ? 0 : req.price;
    return new Menu(
      -1,
      req.menu_name,
      req.menu_type,
      price,
      customerId.customerId,
    );
  }

  @Put(':id')
  @HttpCode(201)
  async updateMenu(
    @Req() req,
    @Param('id') id: string,
    @Body() requestBody: MenuUpdateRequest,
  ): Promise<void> {
    const decoded: CustomerId = req.app.locals.decoded;
    const result = await this.service.updateMenu(
      decoded.customerId,
      parseInt(id),
      requestBody,
    );
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }
}
