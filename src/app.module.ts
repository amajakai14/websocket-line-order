import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { CustomerModule } from './customer/customer.module';
import { LoginModule } from './login/login.module';
import { EventsGateway } from './socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CustomerModule, LoginModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
  exports: [TypeOrmModule],
})
export class AppModule {}
