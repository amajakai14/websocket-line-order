import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfig } from '../config/env.config';
import { CustomerEntity } from '../entities/customer.entity';
import { SessionEntity } from '../entities/session.entity';
import { CustomerRepository } from '../repositories/customer.repository';
import { SessionRepository } from '../repositories/session.repository';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity, CustomerEntity])],
  controllers: [LoginController],
  providers: [
    LoginService,
    SessionRepository,
    CustomerRepository,
    EnvironmentConfig,
  ],
})
export class LoginModule {}
