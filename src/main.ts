import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './config/typeorm.datasource';
import { CustomExceptionFilter } from './utils/filter/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  dataSource.initialize().catch((err) => console.error(err));
  await app.listen(3000);
}
bootstrap();
