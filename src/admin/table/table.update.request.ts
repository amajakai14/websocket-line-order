import { IsBoolean, IsOptional, MaxLength } from 'class-validator';
export class UpdateTableRequest {
  @IsOptional()
  @MaxLength(100)
  table_name: string;

  @IsOptional()
  @IsBoolean()
  is_occupied: boolean;

  constructor() {
    this.table_name = null;
    this.is_occupied = null;
  }
}
