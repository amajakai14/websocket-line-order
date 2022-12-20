import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

export type Env = 'JWT_SECRET';

@Injectable()
export class EnvironmentConfig {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = dotenv.config().parsed;
  }

  get(key: Env): string {
    return this.envConfig[key];
  }
}
