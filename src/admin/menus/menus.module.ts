import { Module } from '@nestjs/common';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MenuRepository } from '../../repositories/menu.repository';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
  controllers: [MenusController],
  providers: [MenusService, MenuRepository, CustomerRepository],
})
export class MenusModule {}
