import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity, CustomerEntity])],
  controllers: [MenuController],
  providers: [MenuService, CustomerRepository, MenuRepository],
})
export class RepositoriesModule {}
