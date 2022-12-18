import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './socket/socket.gateway';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [CustomerModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
