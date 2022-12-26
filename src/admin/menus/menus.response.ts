import { Menu } from '../../model/menu';
import { Result } from '../../model/result';

export class MenusResponse {
  private readonly menuId!: number;
  private readonly name!: string;
  private readonly menuType!: string;
  private readonly price!: number;
  private readonly result: Result;

  constructor(
    menuId: number,
    name: string,
    menuType: string,
    price: number,
    result: Result,
  ) {
    this.menuId = menuId;
    this.name = name;
    this.menuType = menuType;
    this.price = price;
    this.result = result;
  }

  static of(menu: Menu) {
    new MenusResponse(
      menu.menuId,
      menu.name,
      menu.menuType,
      menu.price,
      Result.OK(),
    );
  }
}
