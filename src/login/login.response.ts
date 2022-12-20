import { Result } from '../model/result';
import { Token } from '../model/token';

export class LoginResponse {
  readonly token: Token;
  readonly result: Result;

  constructor(token: Token, result: Result) {
    this.token = token;
    this.result = result;
  }
}
