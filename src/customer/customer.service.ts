import { HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '../model/customer';
import { Result } from '../model/result';
import { CustomerRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(customer: Customer): Promise<Result> {
    let found = await this.customerRepository.getByLoginId(
      customer.loginId.toLowerCase(),
    );
    if (!found.isEmpty()) {
      return Result.BAD(
        HttpStatus.CONFLICT,
        'this id has been registered already',
      );
    }

    found = await this.customerRepository.getByEmail(
      customer.mailAddress.toString(),
    );
    if (!found.isEmpty()) {
      return Result.BAD(
        HttpStatus.CONFLICT,
        'this email address hass been registered already',
      );
    }

    customer = await this.customerRepository.register(customer);
    if (customer.isEmpty()) {
      return Result.BAD(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'unable to insert customer in to Database',
      );
    }
    return Result.OK();
  }
}
