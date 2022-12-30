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
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthUser } from './auth.user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  // @UseInterceptors(TokenInterceptor)
  async login(@Body() req: LoginRequest): Promise<string> {
    const user = await this.service.login(req);
    return this.service.signToken(user);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getInfo(@AuthUser() user: any) {
    console.log(user);
    return user;
  }
}
