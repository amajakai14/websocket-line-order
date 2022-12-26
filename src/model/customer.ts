import { tbl_customer } from '@prisma/client';
import { CustomerId } from './customer-id';
import { LoginId } from './login-id';
import { MailAddress } from './mailaddress';
import { Password } from './password';

export class Customer {
  customerId: CustomerId;
  loginId: LoginId;
  mailAddress: MailAddress;
  password: Password;

  isValid(): boolean {
    return this.customerId.isEmpty();
  }

  isEmpty(): boolean {
    return (
      this.customerId.isEmpty() &&
      this.loginId.isEmpty() &&
      this.mailAddress.isEmpty() &&
      this.password.isEmpty()
    );
  }

  static empty() {
    return new Customer(
      CustomerId.empty(),
      new LoginId(''),
      new MailAddress(''),
      new Password(''),
    );
  }

  static of(customer: tbl_customer): Customer {
    return new Customer(
      new CustomerId(customer.id),
      new LoginId(customer.login_id),
      new MailAddress(customer.mail_address),
      new Password(customer.password),
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
    customerId: CustomerId,
    loginId: LoginId,
    mailAddress: MailAddress,
    password: Password,
  ) {
    this.customerId = customerId;
    this.loginId = loginId;
    this.mailAddress = mailAddress;
    this.password = password;
  }
}
