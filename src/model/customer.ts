import { CustomerEntity } from '../entities/customer.entity';
import { LoginId } from './login-id';
import { MailAddress } from './mailaddress';
import { Password } from './password';

export class Customer {
  loginId: LoginId;
  mailAddress: MailAddress;
  password: Password;

  async toEntity(): Promise<CustomerEntity> {
    const customer = new CustomerEntity();
    customer.login_id = this.loginId.toString();
    customer.email = this.mailAddress.toString();
    customer.password = await this.password.hash();
    return customer;
  }

  isEqual(that: Customer): boolean {
    return (
      this.loginId === that.loginId &&
      this.mailAddress === that.mailAddress &&
      this.password === that.password
    );
  }

  constructor(loginId: LoginId, mailAddress: MailAddress, password: Password) {
    this.loginId = loginId;
    this.mailAddress = mailAddress;
    this.password = password;
  }
}
