import { Module } from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer.repository';
import { PrismaService } from './../prisma/prisma.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository, PrismaService],
})
export class CustomerModule {}
