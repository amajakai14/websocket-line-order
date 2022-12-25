import { Module } from '@nestjs/common';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MenuRepository } from '../../repositories/menu.repository';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, CustomerRepository, MenuRepository],
})
export class MenuModule {}
