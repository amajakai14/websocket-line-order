import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Menu } from '../../model/menu';
enum MenuType {
  APPETIZER = 'appetizer',
  MAIN = 'main',
  DESSERT = 'dessert',
  DRINK = 'DRINK',
}
export class MenuAddRequest {
  @IsNotEmpty()
  @MaxLength(100)
  menu_name: string;

  @IsEnum(MenuType)
  menu_type: MenuType;

  @IsOptional()
  @IsNumber()
  price: number;

  toMenu(): Menu {
    return new Menu(this.menu_name, this.menu_type, this.price);
  }

  constructor() {
    this.menu_name = null;
    this.menu_type;
    this.price = null;
  }
}
