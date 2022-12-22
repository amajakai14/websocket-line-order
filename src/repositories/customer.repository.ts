import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { Customer } from '../model/customer';
import { Result } from '../model/result';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async getByCustomerId(customer_id: number): Promise<Customer> {
    const customerEntity = await this.customerRepository.findOneBy({ customer_id });
    return Customer.of(customerEntity);
  }

  async getByLoginId(login_id: string): Promise<CustomerEntity> {
    return this.customerRepository.findOneBy({ login_id });
  }

  async getByEmail(email: string): Promise<CustomerEntity> {
    return this.customerRepository.findOneBy({ email });
  }

  async register(customerEntity: CustomerEntity): Promise<Result> {
    return this.customerRepository
      .insert(customerEntity)
      .then(Result.OK)
      .catch((err) => new Result(false, HttpStatus.SERVICE_UNAVAILABLE, err));
  }
}
