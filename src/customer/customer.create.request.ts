import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
export class CreateCustomerRequest {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  private readonly _login_id: string;

  @IsNotEmpty()
  @MinLength(8)
  private readonly _password: string;

  @IsNotEmpty()
  @IsEmail()
  private readonly _mailaddress: string;

  public get login_id(): string {
    return this._login_id;
  }

  public get password(): string {
    return this._password;
  }

  public get mail_address(): string {
    return this._mailaddress;
  }
}
