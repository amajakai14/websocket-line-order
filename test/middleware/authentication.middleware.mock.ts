import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class MockAuthenticationMiddleware implements NestMiddleware {
  customerId: number;

  constructor() {
    this.customerId = 1;
  }

  async use(req: Request, res: Response, next: () => void) {
    req.app.locals = {
      customer_id: this.customerId,
    };
    next();
  }
}
