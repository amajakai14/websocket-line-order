import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentConfig } from '../../src/config/env.config';
import { LoginController } from '../../src/login/login.controller';
import { LoginService } from '../../src/login/login.service';
import { CustomerRepository } from '../../src/repositories/customer.repository';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService, CustomerRepository, EnvironmentConfig],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});