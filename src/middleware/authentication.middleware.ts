import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { EnvironmentConfig } from '../config/env.config';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private environmentConfig: EnvironmentConfig) {}
  async use(req: Request, res: Response, next: () => void) {
    const authen = req.headers.authorization;
    if (authen == null) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Cant read authentication');
      return;
    }
    const [type, token] = authen.split(' ');
    const secret = this.environmentConfig.get('JWT_SECRET');

    if (!token || type !== 'Bearer') {
      res.status(HttpStatus.UNAUTHORIZED).send('No token provided');
      return;
    }

    try {
      const decoded = await verify(token, secret);
      req.app.locals = {
        decoded,
      };
      next();
    } catch (err) {
      res.status(HttpStatus.UNAUTHORIZED).send('Invalid token');
    }
  }
}
