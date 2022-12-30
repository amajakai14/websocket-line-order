import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginRequest } from '../login/login.request';
import { Token } from '../model/token';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthUser } from './auth.user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() req: LoginRequest): Promise<Token> {
    const user = await this.service.login(req);
    const token = this.service.signToken(user);
    return new Token(token);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getInfo(@AuthUser() user: any) {
    console.log(user);
    return user;
  }
}
