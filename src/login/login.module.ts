import { Module } from '@nestjs/common';
import { EnvironmentConfig } from '../config/env.config';
import { CustomerRepository } from '../repositories/customer.repository';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, CustomerRepository, EnvironmentConfig],
})
export class LoginModule {}
