import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentConfig } from '../../src/config/env.config';
import { LoginService } from '../../src/login/login.service';
import { UserRepository } from '../../src/repositories/user.repository';
import { PrismaService } from './../../src/prisma/prisma.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        UserRepository,
        EnvironmentConfig,
        PrismaService,
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
