import { IsNotEmpty, IsNumber } from 'class-validator';

export class MatchCourseAndMenuRequest {
  @IsNotEmpty()
  @IsNumber()
  menu_id: number;

  @IsNotEmpty()
  @IsNumber()
  course_id: number;
}
