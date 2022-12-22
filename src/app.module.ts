import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './admin/menu/menu.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfig } from './config/env.config';
import { typeOrmConfig } from './config/typeorm.config';
import { CustomerModule } from './customer/customer.module';
import { LoginModule } from './login/login.module';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { OrderModule } from './order/order.module';
import { EventsGateway } from './socket/socket.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CustomerModule,
    LoginModule,
    OrderModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway, EnvironmentConfig],
  exports: [TypeOrmModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('/admin/menu');
  }
}
