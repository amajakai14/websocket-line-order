export class Customer {
  private readonly _customerId: number;
  private readonly _password: string;
  private readonly _email: string;

  constructor(customerId: number, password: string, email: string) {
    this._customerId = customerId;
    this._password = password;
    this._email = email;
  }

  get id(): number {
    return this._customerId;
  }

  get password(): string {
    return this._password;
  }

  get email(): string {
    return this._email;
  }
  with(email: string): Customer {
    return new Customer(this._customerId, this._password, email);
  }
}
