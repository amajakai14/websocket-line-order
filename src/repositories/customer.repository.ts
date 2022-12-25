import { HttpStatus } from '@nestjs/common';
import { dataSource } from '../config/typeorm.datasource';
import { CustomerEntity } from '../entities/customer.entity';
import { Customer } from '../model/customer';
import { Result } from '../model/result';

export class CustomerRepository {
  async getByCustomerId(customer_id: number): Promise<Customer> {
    const customerEntity = await dataSource.manager.findOneBy(CustomerEntity, {
      customer_id,
    });
    return Customer.of(customerEntity);
  }

  async getByLoginId(login_id: string): Promise<CustomerEntity> {
    return dataSource.manager.findOneBy(CustomerEntity, { login_id });
  }

  async getByEmail(email: string): Promise<CustomerEntity> {
    return dataSource.manager.findOneBy(CustomerEntity, { email });
  }

  async register(customerEntity: CustomerEntity): Promise<Result> {
    return dataSource.manager
      .insert(CustomerEntity, customerEntity)
      .then(Result.OK)
      .catch((err) => new Result(false, HttpStatus.SERVICE_UNAVAILABLE, err));
  }
}
