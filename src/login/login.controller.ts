import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    return this.loginService.login(request);
  }
}
