import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MenuRepository } from '../../repositories/menu.repository';
import { UserRepository } from '../../repositories/user.repository';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, UserRepository, MenuRepository, PrismaService],
})
export class MenuModule {}
