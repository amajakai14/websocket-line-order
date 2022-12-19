import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerRepository } from '../repositories/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository, CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
