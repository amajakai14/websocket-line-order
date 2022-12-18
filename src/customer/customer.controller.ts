import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerRequest } from './customer.create.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @Body() createCustomerRequest: CreateCustomerRequest,
  ): Promise<void> {
    console.log(createCustomerRequest);
  }
}
