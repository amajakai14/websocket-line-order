import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
export class MenuAddRequest {
  @IsNotEmpty()
  @MaxLength(100)
  menu_name: string;

  @IsNotEmpty()
  menu_type: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}
