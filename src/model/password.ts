import * as bcrypt from 'bcrypt';
export class Password {
  password!: string;

  private readonly saltRounds = 10;

  async hash(): Promise<string> {
    return bcrypt.hash(this.password, this.saltRounds);
  }

  async compareHashed(hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(this.password, hashedPassword);
  }

  isEmpty(): boolean {
    return this.password === '';
  }

  constructor(password: string) {
    this.password = password;
  }
}
