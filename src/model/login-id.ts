export class LoginId {
  readonly loginId: string;

  isEqual(that: string): boolean {
    return this.loginId === that;
  }

  toString(): string {
    return this.loginId;
  }

  constructor(loginId: string) {
    this.loginId = loginId;
  }
}
