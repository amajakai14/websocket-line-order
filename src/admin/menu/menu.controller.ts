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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { AuthUser } from '../../auth/auth.user.decorator';
import { UserWithoutPassword } from '../../auth/jwt/jwt.payload';
import { Menu } from '../../model/menu';
import { MenuAddRequest } from './menu.add.request';
import { MenuService } from './menu.service';
import { MenuUpdateRequest } from './menu.update.request';

@Controller('admin/menus')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async menus(@AuthUser() user: UserWithoutPassword): Promise<Menu[]> {
    const result = await this.service.menusOf(user.userId);
    if (result.result.isBad()) {
      throw new HttpException(
        result.result.errorMessage,
        result.result.httpStatus,
      );
    }
    return result.menus;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMenu(
    @AuthUser() user: UserWithoutPassword,
    @Body() menuAddRequest: MenuAddRequest,
  ): Promise<void> {
    console.log('user ', user);
    const result = await this.service.createMenu(
      user.userId,
      this.toMenu(menuAddRequest, user.userId),
    );

    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }

  toMenu(req: MenuAddRequest, userId: number): Menu {
    const price = req.price == null ? 0 : req.price;
    return new Menu(-1, req.menu_name, req.menu_type, price, userId);
  }

  @Put(':id')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async updateMenu(
    @AuthUser() user: UserWithoutPassword,
    @Param('id') id: string,
    @Body() requestBody: MenuUpdateRequest,
  ): Promise<void> {
    const menu_id = parseInt(id);
    if (isNaN(menu_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    const result = await this.service.updateMenu(
      user.userId,
      parseInt(id),
      requestBody,
    );
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async deleteMenu(
    @AuthUser() user: UserWithoutPassword,
    @Param('id') id: string,
  ): Promise<void> {
    const menu_id = parseInt(id);
    if (isNaN(menu_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    const result = await this.service.deleteMenu(user.userId, menu_id);
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }
}
