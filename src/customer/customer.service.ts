import { HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '../model/customer';
import { Result } from '../model/result';
import { CustomerRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private customersRepository: CustomerRepository) {}

  async create(customer: Customer): Promise<Result> {
    let found = await this.customersRepository.getById(
      customer.loginId.toString(),
    );
    if (found != null) {
      return Result.BAD(
        HttpStatus.CONFLICT,
        'this id has been registered already',
      );
    }

    found = await this.customersRepository.getByEmail(
      customer.mailAddress.toString(),
    );
    if (found != null) {
      return Result.BAD(
        HttpStatus.CONFLICT,
        'this email address hass been registered already',
      );
    }

    return this.customersRepository.register(await customer.toEntity());
  }
}
