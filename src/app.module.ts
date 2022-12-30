import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ChannelproviderModule } from './admin/channelprovider/channelprovider.module';
import { MatchCourseAndMenuModule } from './admin/matchcourseandmenu/matchcourseandmenu.module';
import { MenuModule } from './admin/menu/menu.module';
import { TableModule } from './admin/table/table.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EnvironmentConfig } from './config/env.config';
import { CourseModule } from './course/course.module';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { OrderModule } from './order/order.module';
import { PrismaService } from './prisma/prisma.service';
import { TasksService } from './scheduler/task.service';
import { EventsGateway } from './socket/socket.gateway';
import { CustomerModule } from './user/user.module';

@Module({
  imports: [
    CustomerModule,
    OrderModule,
    MenuModule,
    TableModule,
    ChannelproviderModule,
    ScheduleModule.forRoot(),
    CourseModule,
    AuthModule,
    MatchCourseAndMenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EventsGateway,
    EnvironmentConfig,
    TasksService,
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('/admin/menu', '/admin/menus');
  }
}
