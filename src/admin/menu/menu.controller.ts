import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
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

@Controller('admin/menus')
export class MenuController {
  constructor(private readonly service: MenuService) {}

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
    const menu_id = parseInt(id);
    if (isNaN(menu_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    const result = await this.service.updateMenu(
      decoded.customerId,
      parseInt(id),
      requestBody,
    );
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteMenu(@Req() req, @Param('id') id: string): Promise<void> {
    const decoded: CustomerId = req.app.locals.decoded;
    const menu_id = parseInt(id);
    if (isNaN(menu_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    const result = await this.service.deleteMenu(decoded.customerId, menu_id);
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }
}
