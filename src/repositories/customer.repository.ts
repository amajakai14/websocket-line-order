import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { Customer } from '../model/customer';
import { Result } from '../model/result';

export class CustomerRepository extends Repository<CustomerEntity> {
  async getByCustomerId(customer_id: number): Promise<Customer> {
    const customerEntity = await this.findOneBy({ customer_id });
    return Customer.of(customerEntity);
  }

  async getByLoginId(login_id: string): Promise<CustomerEntity> {
    return this.findOneBy({ login_id });
  }

  async getByEmail(email: string): Promise<CustomerEntity> {
    return this.findOneBy({ email });
  }

  async register(customerEntity: CustomerEntity): Promise<Result> {
    return this.insert(customerEntity)
      .then(Result.OK)
      .catch((err) => new Result(false, HttpStatus.SERVICE_UNAVAILABLE, err));
  }
}
