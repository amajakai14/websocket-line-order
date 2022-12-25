export class CustomerId {
  customerId!: number;
  static readonly INVALID_ID = -1;

  value(): number {
    return this.customerId;
  }

  static empty(): CustomerId {
    return new CustomerId(this.INVALID_ID);
  }

  isEmpty(): boolean {
    return this.customerId != CustomerId.INVALID_ID;
  }

  constructor(customerId: number) {
    this.customerId = customerId;
  }
}
