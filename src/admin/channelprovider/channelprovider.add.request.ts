import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateChannelRequest {
  @IsNotEmpty()
  @IsNumber()
  table_id: number;

  @IsNotEmpty()
  @IsNumber()
  course_id: number;
  status: string;

  constructor() {
    this.table_id = null;
    this.course_id = null;
    this.status = null;
  }
}
