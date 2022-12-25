import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { Customer } from '../model/customer';
import { CustomerId } from '../model/customer-id';
import { LoginId } from '../model/login-id';
import { MailAddress } from '../model/mailaddress';
import { Password } from '../model/password';
import { Result } from '../model/result';
import { CreateCustomerRequest } from './customer.create.request';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(@Body() request: CreateCustomerRequest) {
    const customer = new Customer(
      CustomerId.empty(),
      new LoginId(request.loginId),
      new MailAddress(request.mailAddress),
      new Password(request.password),
    );

    const result: Result = await this.customerService.create(customer);
    if (result.isBad())
      throw new HttpException(
        { message: result.errorMessage },
        result.httpStatus,
      );
  }
}
