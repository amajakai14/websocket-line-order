import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../src/repositories/user.repository';
import { UserService } from '../../src/user/user.service';
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
