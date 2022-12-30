import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class CreateUserRequest {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  loginId: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  mailAddress: string;
}
