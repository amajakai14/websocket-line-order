import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer.repository';
import { Customer } from '../model/customer';

@Injectable()
export class CustomerService {
  constructor(private customersRepository: CustomerRepository) {}

  async create(customer: Customer): Promise<void> {
    const x = await this.customersRepository.getById(
      customer._loginId.toString(),
    );
    console.log('found loginId', x);
    if (x != null) {
      throw new HttpException('Cannot use this login id', HttpStatus.CONFLICT);
    }

    const y = await this.customersRepository.getByEmail(
      customer._mailAddress.toString(),
    );
    if (y != null) {
      throw new HttpException(
        'Cannot use this email address',
        HttpStatus.CONFLICT,
      );
    }

    this.customersRepository.register(await customer.toEntity());
  }
}
