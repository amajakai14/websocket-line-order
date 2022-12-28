import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MenuRepository } from '../../repositories/menu.repository';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, CustomerRepository, MenuRepository, PrismaService],
})
export class MenuModule {}
