import { Body, Controller, Get } from '@nestjs/common';
import { Menu } from '../../model/menu';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private readonly service: MenusService) {}
  @Get()
  menus(@Body() token): Menu[] {
    return [Menu.empty()];
  }
}
