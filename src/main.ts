import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './utils/filter/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.use(cookieParser('MY SECRET'));
  // app.use(
  //   session({
  //     secret: process.env.APP_SECRET as string,
  //     resave: false,
  //     saveUninitialized: false,
  //     store: new session.MemoryStore(),
  //     cookie: {
  //       httpOnly: true,
  //       signed: true,
  //       sameSite: 'strict',
  //       secure: process.env.NODE_ENV === 'production',
  //     },
  //   }),
  // );
  app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
