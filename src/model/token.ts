export class Token {
  readonly token: string;

  toString(): string {
    return this.token;
  }

  constructor(token: string) {
    this.token = token;
  }
}
