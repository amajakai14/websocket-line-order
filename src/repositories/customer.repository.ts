import { Repository } from 'typeorm';
import { CreateCustomerRequest } from '../customer/customer.create.request';
import { CustomerEntity } from '../entities/customer.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async getById(login_id: string): Promise<CustomerEntity> {
    return this.customerRepository.findOneBy({ login_id });
  }

  async getByEmail(email: string): Promise<CustomerEntity> {
    return this.customerRepository.findOneBy({ email });
  }

  async register(customerEntity: CustomerEntity): Promise<void> {
    this.customerRepository.insert(customerEntity);
  }
}
