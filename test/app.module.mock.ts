import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MenuModule } from '../src/admin/menu/menu.module';
import { MenusModule } from '../src/admin/menus/menus.module';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { EnvironmentConfig } from '../src/config/env.config';
import { typeOrmConfig } from '../src/config/typeorm.config';
import { CustomerModule } from '../src/customer/customer.module';
import { LoginModule } from '../src/login/login.module';
import { OrderModule } from '../src/order/order.module';
import { EventsGateway } from '../src/socket/socket.gateway';
import { MockAuthenticationMiddleware } from './middleware/authentication.middleware.mock';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CustomerModule,
    LoginModule,
    OrderModule,
    MenuModule,
    MenusModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway, EnvironmentConfig],
  exports: [TypeOrmModule],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MockAuthenticationMiddleware)
      .forRoutes('/admin/menu', '/admin/menus');
  }
}
