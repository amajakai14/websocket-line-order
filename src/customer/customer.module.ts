import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
