import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
  ) {}

  findOne(login_id: string, password: string): boolean {
    const user = this.customersRepository.findOneBy({ login_id, password });
    return user !== null;
  }

  addOne(customer: CustomerEntity) {
    this.customersRepository.save(customer);
  }

  private isDuplicate(): boolean {
    return true;
  }
}
