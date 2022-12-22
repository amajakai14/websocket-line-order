import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { MenuType } from '../../entities/menu.entity';
export class MenuAddRequest {
  @IsNotEmpty()
  @MaxLength(100)
  menu_name: string;

  @IsEnum(MenuType)
  menu_type: MenuType;

  @IsOptional()
  @IsNumber()
  price?: number;

  constructor() {
    this.menu_name = null;
    this.menu_type;
    this.price = null;
  }
}
