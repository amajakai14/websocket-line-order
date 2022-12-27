import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../../src/customer/customer.controller';
import { CustomerService } from '../../src/customer/customer.service';
import { CustomerRepository } from '../../src/repositories/customer.repository';
import { PrismaService } from './../../src/prisma/prisma.service';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService, CustomerRepository, PrismaService],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
