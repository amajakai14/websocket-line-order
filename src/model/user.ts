import { tbl_user } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class User {
  userId: number;
  loginId: string;
  mailAddress: string;
  password: string;

  private readonly saltRounds = 10;

  isValid(): boolean {
    return this.userId != -1;
  }

  isEmpty(): boolean {
    return (
      this.userId === -1 &&
      this.loginId === '' &&
      this.mailAddress === '' &&
      this.password === ''
    );
  }

  static empty() {
    return new User(-1, '', '', '');
  }

  async hashPassword(): Promise<string> {
    return bcrypt.hash(this.password, this.saltRounds);
  }

  async compareHashed(text: string): Promise<boolean> {
    return await bcrypt.compare(text, this.password);
  }

  static of(user: tbl_user): User {
    return new User(user.id, user.login_id, user.mail_address, user.password);
  }

  isEqual(that: User): boolean {
    return (
      this.loginId === that.loginId &&
      this.mailAddress === that.mailAddress &&
      this.password === that.password
    );
  }

  constructor(
    userId: number,
    loginId: string,
    mailAddress: string,
    password: string,
  ) {
    this.userId = userId;
    this.loginId = loginId.toLowerCase();
    this.mailAddress = mailAddress.toLowerCase();
    this.password = password;
  }
}
