import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { Result } from '../model/result';
import { User } from '../model/user';
import { CreateUserRequest } from './user.create.request';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(readonly customerService: UserService) {}

  @Post()
  async createCustomer(@Body() request: CreateUserRequest) {
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
