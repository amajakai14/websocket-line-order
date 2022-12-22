import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '../../entities/customer.entity';
import { MenuEntity } from '../../entities/menu.entity';
import { CustomerRepository } from '../../repositories/customer.repository';
import { MenuRepository } from '../../repositories/menu.repository';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity, CustomerEntity])],
  controllers: [MenuController],
  providers: [MenuService, CustomerRepository, MenuRepository],
})
export class MenuModule {}
