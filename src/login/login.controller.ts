import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { Token } from '../model/token';
import { LoginRequest } from './login.request';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() request: LoginRequest): Promise<Token> {
    const result = await this.loginService.login(request);
    if (result.result.isBad())
      throw new HttpException(
        { message: result.result.errorMessage },
        result.result.httpStatus,
      );
    return result.token;
  }
}
