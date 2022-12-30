import { HttpStatus, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { EnvironmentConfig } from '../config/env.config';
import { Result } from '../model/result';
import { Token } from '../model/token';
import { UserRepository } from '../repositories/user.repository';
import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';

@Injectable()
export class LoginService {
  constructor(
    private customersRepository: UserRepository,
    private environmentConfig: EnvironmentConfig,
  ) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    const customer = await this.customersRepository.getByLoginId(
      request.loginId,
    );
    if (customer.isEmpty()) {
      return this.invalidLoginResponse();
    }
    const validate = await customer.compareHashed(request.password);
    if (!validate) {
      return this.invalidLoginResponse();
    }

    const secret = this.environmentConfig.get('JWT_SECRET');
    const token = new Token(
      sign({ customerId: customer.userId }, secret, {
        expiresIn: 600,
      }),
    );
    return new LoginResponse(token, Result.OK());
  }

  private invalidLoginResponse(): LoginResponse {
    const result = Result.BAD(
      HttpStatus.BAD_REQUEST,
      'ID or Password are incorrect',
    );
    return new LoginResponse(new Token(null), result);
  }
}
