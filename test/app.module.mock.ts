import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { EnvironmentConfig } from '../src/config/env.config';
import { EventsGateway } from '../src/socket/socket.gateway';
import { MockAuthenticationMiddleware } from './middleware/authentication.middleware.mock';

@Module({
  controllers: [AppController],
  providers: [AppService, EventsGateway, EnvironmentConfig],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MockAuthenticationMiddleware)
      .forRoutes('/admin/menu', '/admin/menus');
  }
}
