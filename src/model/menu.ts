export class Menu {
  name: string;
  menyType: string;
  price: number;

  constructor(name: string, menuType: string, price: number) {
    return new Menu(name, menuType, price);
  }
}
