import { Module } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { PrismaService } from './../prisma/prisma.service';
import { CustomerController } from './customer.controller';
import { UserService } from './customer.service';

@Module({
  controllers: [CustomerController],
  providers: [UserService, UserRepository, PrismaService],
})
export class CustomerModule {}
