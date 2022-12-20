import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
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
      new LoginId(request.login_id),
      new MailAddress(request.mail_address),
      new Password(request.password),
    );

    throw new HttpException('Cannot use this login id', HttpStatus.CONFLICT);
    this.customerService.create(customer);
  }
}
