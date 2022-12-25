export class MailAddress {
  mailAddress!: string;

  isEqual(that: string): boolean {
    return this.mailAddress === that;
  }

  toString(): string {
    return this.mailAddress;
  }

  isEmpty(): boolean {
    return this.mailAddress === '';
  }

  constructor(mailAddress: string) {
    this.mailAddress = mailAddress.toLowerCase();
  }
}
