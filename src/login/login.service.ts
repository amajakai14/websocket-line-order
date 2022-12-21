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
    const customerEntity = await this.customersRepository.getById(
      request.loginId,
    );
    if (customerEntity == null) {
      const result = Result.BAD(
        HttpStatus.BAD_REQUEST,
        'ID or Password are incorrect',
      );
      return new LoginResponse(new Token(null), result);
    }
    const validate = await this.validatePasswordOf(request, customerEntity);
    if (!validate) {
      const result = Result.BAD(
        HttpStatus.BAD_REQUEST,
        'ID or Password are incorrect',
      );
      return new LoginResponse(new Token(null), result);
    }

    const secret = this.environmentConfig.get('JWT_SECRET');
    console.log('secret', secret);
    const token = new Token(sign(request, secret, { expiresIn: 600 }));
    console.log('token', token);
    return new LoginResponse(token, Result.OK());
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
