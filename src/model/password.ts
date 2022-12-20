import * as bcrypt from 'bcrypt';
export class Password {
  readonly password: string;

  private readonly saltRounds = 10;

  async hash(): Promise<string> {
    return bcrypt.hash(this.password, this.saltRounds);
  }
  constructor(password: string) {
    this.password = password;
  }
}
