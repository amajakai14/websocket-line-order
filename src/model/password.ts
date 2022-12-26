import * as bcrypt from 'bcrypt';
export class Password {
  password!: string;

  private readonly saltRounds = 10;

  async hash(): Promise<string> {
    return bcrypt.hash(this.password, this.saltRounds);
  }

  async compareHashed(text: string): Promise<boolean> {
    return await bcrypt.compare(text, this.password);
  }

  isEmpty(): boolean {
    return this.password === '';
  }

  constructor(password: string) {
    this.password = password;
  }
}
