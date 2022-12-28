import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTableRequest {
  @IsNotEmpty()
  @MaxLength(100)
  table_name: string;

  constructor() {
    this.table_name = null;
  }
}
