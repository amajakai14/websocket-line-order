import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserWithoutPassword } from './jwt/jwt.payload';

export const AuthUser = createParamDecorator(
  (data: keyof UserWithoutPassword, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<Request>()
      .user as UserWithoutPassword;

    return data ? user && user[data] : user;
  },
);
