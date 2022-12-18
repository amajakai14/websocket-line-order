import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './socket/socket.gateway';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';

@Module({
  imports: [CustomerModule, TypeOrmModule.forRootAsync(typeOrmAsyncConfig)],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
