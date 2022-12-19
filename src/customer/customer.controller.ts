import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateCustomerRequest } from './customer.create.request';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(201)
  async createCustomer(@Body() request: CreateCustomerRequest): Promise<void> {
    this.customerService.create(request);
  }
}
