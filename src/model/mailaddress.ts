export class MailAddress {
  private readonly _mailAddress: string;

  isEqual(that: string): boolean {
    return this._mailAddress === that;
  }

  toString(): string {
    return this._mailAddress;
  }

  constructor(mailAddress: string) {
    this._mailAddress = mailAddress.toLowerCase();
  }
}
