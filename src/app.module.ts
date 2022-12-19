import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './socket/socket.gateway';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { LoginModule } from './login/login.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CustomerModule, LoginModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
  exports: [TypeOrmModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
