import * as bcrypt from 'bcrypt';
export class Password {
  private readonly _password: string;

  private readonly saltRounds = 10;

  async hash(): Promise<string> {
    return bcrypt.hash(this._password, this.saltRounds);
  }
  constructor(password: string) {
    this._password = password;
  }
}
