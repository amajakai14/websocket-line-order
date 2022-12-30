import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../repositories/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    UserRepository,
    PrismaService,
    JwtStrategy,
    TokenInterceptor,
  ],
  exports: [AuthService],
})
export class AuthModule {}
