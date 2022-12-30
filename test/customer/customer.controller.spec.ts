import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../src/repositories/user.repository';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { PrismaService } from './../../src/prisma/prisma.service';

describe('CustomerController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
