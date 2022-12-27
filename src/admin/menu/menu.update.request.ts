import { IsBoolean, IsNumber, IsOptional, MaxLength } from 'class-validator';
export class MenuUpdateRequest {
  @IsOptional()
  @MaxLength(100)
  menu_name?: string;

  @IsOptional()
  menu_type?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;

  constructor() {
    this.menu_name = null;
    this.menu_type;
    this.price = null;
    this.available = null;
  }
}
