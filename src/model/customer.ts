import { LoginId } from './login-id';
import { MailAddress } from './mailaddress';
import { Password } from './password';
import { CustomerEntity } from '../entities/customer.entity';

export class Customer {
  readonly _loginId: LoginId;
  readonly _mailAddress: MailAddress;
  readonly _password: Password;

  async toEntity(): Promise<CustomerEntity> {
    const customer = new CustomerEntity();
    customer.login_id = this._loginId.toString();
    customer.email = this._mailAddress.toString();
    customer.password = await this._password.hash();
    return customer;
  }

  isEqual(that: Customer): boolean {
    return (
      this._loginId === that._loginId &&
      this._mailAddress === that._mailAddress &&
      this._password === that._password
    );
  }

  constructor(loginId: LoginId, mailAddress: MailAddress, password: Password) {
    this._loginId = loginId;
    this._mailAddress = mailAddress;
    this._password = password;
  }
}
