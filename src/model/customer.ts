import { tbl_customer } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class Customer {
  customerId: number;
  loginId: string;
  mailAddress: string;
  password: string;

  private readonly saltRounds = 10;

  isValid(): boolean {
    return this.customerId != -1;
  }

  isEmpty(): boolean {
    return (
      this.customerId === -1 &&
      this.loginId === '' &&
      this.mailAddress === '' &&
      this.password === ''
    );
  }

  static empty() {
    return new Customer(-1, '', '', '');
  }

  async hashPassword(): Promise<string> {
    return bcrypt.hash(this.password, this.saltRounds);
  }

  async compareHashed(text: string): Promise<boolean> {
    return await bcrypt.compare(text, this.password);
  }

  static of(customer: tbl_customer): Customer {
    return new Customer(
      customer.id,
      customer.login_id,
      customer.mail_address,
      customer.password,
    );
  }

  isEqual(that: Customer): boolean {
    return (
      this.loginId === that.loginId &&
      this.mailAddress === that.mailAddress &&
      this.password === that.password
    );
  }

  constructor(
    customerId: number,
    loginId: string,
    mailAddress: string,
    password: string,
  ) {
    this.customerId = customerId;
    this.loginId = loginId.toLowerCase();
    this.mailAddress = mailAddress.toLowerCase();
    this.password = password;
  }
}
