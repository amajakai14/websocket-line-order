import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class LoginRequest {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  loginId: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
