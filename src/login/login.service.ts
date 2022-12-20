import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerRepository } from '../repositories/customer.repository';
import { SessionRepository } from '../repositories/session.repository';
import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';

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
