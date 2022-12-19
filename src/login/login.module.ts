import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '../repositories/customer.repository';
import { SessionRepository } from '../repositories/session.repository';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { SessionEntity } from '../entities/session.entity';
import { CustomerEntity } from '../entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity, CustomerEntity])],
  controllers: [LoginController],
  providers: [LoginService, SessionRepository, CustomerRepository],
})
export class LoginModule {}
