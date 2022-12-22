import { HttpStatus, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { EnvironmentConfig } from '../config/env.config';
import { CustomerEntity } from '../entities/customer.entity';
import { Password } from '../model/password';
import { Result } from '../model/result';
import { Token } from '../model/token';
import { CustomerRepository } from '../repositories/customer.repository';
import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';

@Injectable()
export class LoginService {
  constructor(
    private customersRepository: CustomerRepository,
    private environmentConfig: EnvironmentConfig,
  ) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    const customerEntity = await this.customersRepository.getByLoginId(
      request.loginId,
    );
    if (customerEntity == null) {
      return this.invalidLoginResponse();
    }
    const validate = await this.validatePasswordOf(request, customerEntity);
    if (!validate) {
      return this.invalidLoginResponse();
    }

    const secret = this.environmentConfig.get('JWT_SECRET');
    const token = new Token(
      sign({ customerId: customerEntity.customer_id }, secret, {
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

  async validatePasswordOf(
    request: LoginRequest,
    customerEntity: CustomerEntity,
  ): Promise<boolean> {
    return await new Password(request.password).compareHashed(
      customerEntity.password,
    );
  }
}
