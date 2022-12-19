import { Token } from '../model/token';

export class LoginResponse {
  private readonly _token: Token;

  constructor(token: Token) {
    this._token = token;
  }
}
