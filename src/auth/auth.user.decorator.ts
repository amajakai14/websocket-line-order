import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JWTPayloadUser, UserWithoutPassword } from './jwt/jwt.payload';

export const AuthUser = createParamDecorator(
  (data: keyof JWTPayloadUser, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<Request>()
      .user as JWTPayloadUser;

    const userDetail: UserWithoutPassword = {
      userId: user.userId,
      loginId: user.loginId,
      mailAddress: user.mailAddress,
    };

    return data ? userDetail && userDetail[data] : userDetail;
  },
);
