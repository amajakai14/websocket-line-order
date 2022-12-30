import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentConfig } from '../../src/config/env.config';
import { LoginController } from '../../src/login/login.controller';
import { LoginService } from '../../src/login/login.service';
import { UserRepository } from '../../src/repositories/user.repository';
import { PrismaService } from './../../src/prisma/prisma.service';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        LoginService,
        UserRepository,
        EnvironmentConfig,
        PrismaService,
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
