import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/customer/customer.service';
import { UserRepository } from '../../src/repositories/user.repository';
import { PrismaService } from './../../src/prisma/prisma.service';

describe('CustomerService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
