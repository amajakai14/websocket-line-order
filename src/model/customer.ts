import { CustomerEntity } from '../entities/customer.entity';
import { CustomerId } from './customer-id';
import { LoginId } from './login-id';
import { MailAddress } from './mailaddress';
import { Password } from './password';

export class Customer {
  customerId: CustomerId;
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

  isValid(): boolean {
    return this.customerId.isValid();
  }

  static of(customerEntity: CustomerEntity): Customer {
    const customerId =
      customerEntity.customer_id == null
        ? CustomerId.INVALID_ID
        : customerEntity.customer_id;

    return new Customer(
      new CustomerId(customerId),
      new LoginId(customerEntity.login_id),
      new MailAddress(customerEntity.email),
      new Password(customerEntity.password),
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
