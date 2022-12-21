import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class OrderAddRequest {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsInt()
  price: number;
}
