import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../../src/customer/customer.controller';
import { UserService } from '../../src/customer/customer.service';
import { UserRepository } from '../../src/repositories/user.repository';
import { PrismaService } from './../../src/prisma/prisma.service';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [UserService, UserRepository, PrismaService],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
