import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Customer } from '../model/customer';
import { LoginId } from '../model/login-id';
import { MailAddress } from '../model/mailaddress';
import { Password } from '../model/password';
import { CreateCustomerRequest } from './customer.create.request';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(201)
  async createCustomer(@Body() request: CreateCustomerRequest) {
    const customer = new Customer(
      new LoginId(request.loginId),
      new MailAddress(request.mailAddress),
      new Password(request.password),
    );

    this.customerService.create(customer);
  }
}
