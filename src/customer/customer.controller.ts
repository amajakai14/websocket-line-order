import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { Result } from '../model/result';
import { User } from '../model/user';
import { CreateCustomerRequest } from './customer.create.request';
import { UserService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(readonly customerService: UserService) {}

  @Post()
  async createCustomer(@Body() request: CreateCustomerRequest) {
    const customer = new User(
      -1,
      request.loginId,
      request.mailAddress,
      request.password,
    );

    const result: Result = await this.customerService.create(customer);
    if (result.isBad())
      throw new HttpException(
        { message: result.errorMessage },
        result.httpStatus,
      );
  }
}
