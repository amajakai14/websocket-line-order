import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginResponse } from './login.response';
import { LoginRequest } from './login.request';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    console.log(request.loginId);
    console.log(request.password);
    return this.loginService.login(request);
  }
}
