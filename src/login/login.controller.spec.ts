import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentConfig } from '../config/env.config';
import { CustomerRepository } from '../repositories/customer.repository';
import { SessionRepository } from '../repositories/session.repository';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        LoginService,
        SessionRepository,
        CustomerRepository,
        EnvironmentConfig,
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
