export class Token {
  private readonly _token: string;

  toString(): string {
    return this._token;
  }

  constructor(token: string) {
    this._token = token;
  }
}
