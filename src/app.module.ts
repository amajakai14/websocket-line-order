import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MenuModule } from './admin/menu/menu.module';
import { TableModule } from './admin/table/table.module';
import { TablesModule } from './admin/tables/tables.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfig } from './config/env.config';
import { CustomerModule } from './customer/customer.module';
import { LoginModule } from './login/login.module';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { OrderModule } from './order/order.module';
import { EventsGateway } from './socket/socket.gateway';
import { ChannelproviderModule } from './admin/channelprovider/channelprovider.module';

@Module({
  imports: [
    CustomerModule,
    LoginModule,
    OrderModule,
    MenuModule,
    TablesModule,
    TableModule,
    ChannelproviderModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway, EnvironmentConfig],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('/admin/menu', '/admin/menus');
  }
}
