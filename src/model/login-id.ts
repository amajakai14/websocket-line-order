export class LoginId {
  private readonly _loginId: string;

  isEqual(that: string): boolean {
    return this._loginId === that;
  }

  toString(): string {
    return this._loginId;
  }

  constructor(loginId: string) {
    this._loginId = loginId;
  }
}
