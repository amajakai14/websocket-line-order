import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { LoginResponse } from './login.response';
import { LoginRequest } from './login.request';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from '../repositories/customer.repository';
import { UnauthorizedException } from '@nestjs/common';
import { SessionRepository } from '../repositories/session.repository';

@Injectable()
export class LoginService {
  constructor(
    private customersRepository: CustomerRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    const customer = await this.customersRepository.getById(request.loginId);
    if (customer == null) throw new UnauthorizedException();

    const token = await this.sessionRepository.createSessionOf(
      customer.customer_id,
    );

    if (token == null)
      throw new HttpException(
        'unable to generate token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return new LoginResponse(token);
  }
}
