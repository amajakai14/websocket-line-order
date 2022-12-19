import { Injectable } from '@nestjs/common';
import { CreateCustomerRequest } from './customer.create.request';
import * as bcrypt from 'bcrypt';
import { CustomerRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private customersRepository: CustomerRepository) {}

  async create(request: CreateCustomerRequest): Promise<void> {
    const hashedPassword = await this.hash(request.password);
    request.password = hashedPassword;
    this.customersRepository.register(request);
  }

  private async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
