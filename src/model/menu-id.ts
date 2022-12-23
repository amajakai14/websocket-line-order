export class MenuId {
  menuId: number;
  static readonly INVALID_ID = -1;

  value(): number {
    return this.menuId;
  }

  static empty(): MenuId {
    return new MenuId(this.INVALID_ID);
  }

  isValid(): boolean {
    return this.menuId != MenuId.INVALID_ID;
  }

  constructor(menuId: number) {
    this.menuId = menuId;
  }
}
