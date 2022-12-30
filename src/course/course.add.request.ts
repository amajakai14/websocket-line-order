import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
export class CourseAddRequest {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  course_priority: number;

  @IsOptional()
  @IsNumber()
  timelimit: number;
}
