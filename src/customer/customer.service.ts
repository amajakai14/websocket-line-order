import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../model/customer';
import { Result } from '../model/result';
import { CustomerRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create(customer: Customer): Promise<Result> {
    let found = await this.customerRepository.getByLoginId(
      customer.loginId.toString(),
    );
    if (found != null) {
      return Result.BAD(
        HttpStatus.CONFLICT,
        'this id has been registered already',
      );
    }

    found = await this.customerRepository.getByEmail(
      customer.mailAddress.toString(),
    );
    if (found != null) {
      return Result.BAD(
        HttpStatus.CONFLICT,
        'this email address hass been registered already',
      );
    }

    return this.customerRepository.register(await customer.toEntity());
  }
}
