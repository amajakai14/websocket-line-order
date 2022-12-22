export class LoginId {
  loginId: string;

  isEqual(that: string): boolean {
    return this.loginId === that;
  }

  constructor(loginId: string) {
    this.loginId = loginId.toLowerCase();
  }
}
