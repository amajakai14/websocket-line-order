export class LoginId {
  loginId!: string;

  isEqual(that: string): boolean {
    return this.loginId === that;
  }

  toString(): string {
    return this.loginId;
  }

  isEmpty(): boolean {
    return this.loginId === '';
  }

  constructor(loginId: string) {
    this.loginId = loginId.toLowerCase();
  }
}
