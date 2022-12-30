import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from '../model/result';
import { User } from '../model/user';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly customerRepository: UserRepository) {}

  async create(customer: User): Promise<Result> {
    let found = await this.customerRepository.getByLoginId(customer.loginId);
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
