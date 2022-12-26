import { Module } from '@nestjs/common';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MenuRepository } from '../../repositories/menu.repository';
import { PrismaService } from './../../prisma/prisma.service';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
  controllers: [MenusController],
  providers: [MenusService, MenuRepository, CustomerRepository, PrismaService],
})
export class MenusModule {}
