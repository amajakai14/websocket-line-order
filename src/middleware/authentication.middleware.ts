import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { EnvironmentConfig } from '../config/env.config';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private environmentConfig: EnvironmentConfig) {}
  async use(req: Request, res: Response, next: () => void) {
    const [type, token] = req.headers.authorization.split(' ');
    const secret = this.environmentConfig.get('JWT_SECRET');

    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED).send('No token provided');
      return;
    }

    try {
      const decoded = await verify(token, secret);
      console.log('decoded:', decoded);
      next();
    } catch (err) {
      res.status(HttpStatus.UNAUTHORIZED).send('Invalid token');
    }
  }
}
