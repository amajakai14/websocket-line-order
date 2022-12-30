import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from '../login/login.request';
import { User } from '../model/user';
import { UserRepository } from '../repositories/user.repository';
import { JwtPayload, UserWithoutPassword } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(req: LoginRequest): Promise<UserWithoutPassword> {
    const user = await this.userRepository.getByLoginId(req.loginId);
    if (user.isEmpty()) {
      throw new UnauthorizedException('no such a user');
    }

    const validatePassword = user.compareHashed(req.password);
    if (!validatePassword) {
      throw new UnauthorizedException('no such a user');
    }
    return this.userPayload(user);
  }

  userPayload(user: User): UserWithoutPassword {
    const { password, ...props } = user;
    console.log('transform user', props);
    return props;
  }

  async verifyPayload(payload: JwtPayload) {
    console.log('verify payload at auth service', payload);
    const user = await this.userRepository.getByUserId(payload.userId);
    if (user == null) {
      throw new UnauthorizedException('no such a user from this payload');
    }
    console.log('user in auth service', user);
    return this.userPayload(user);
  }

  signToken(user: UserWithoutPassword) {
    return this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET,
      expiresIn: '24h',
    });
  }
}
