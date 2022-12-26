import { Menu } from '../../model/menu';
import { Result } from '../../model/result';

export class MenusResponse {
  readonly menus: Menu[];
  readonly result: Result;

  constructor(menus: Menu[], result: Result) {
    this.menus = menus;
    this.result = result;
  }
}
