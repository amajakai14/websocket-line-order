import { tbl_table } from '@prisma/client';

export class Table {
  tableId!: number;
  tableName!: string;
  isOccupied: boolean;
  customerId!: number;

  constructor(
    tableId: number,
    tableName: string,
    isOccupied: boolean,
    customerId: number,
  ) {
    this.tableId = tableId;
    this.tableName = tableName;
    this.isOccupied = isOccupied;
    this.customerId = customerId;
  }

  static empty(): Table {
    return new Table(-1, '', false, -1);
  }

  static of(table: tbl_table) {
    return new Table(
      table.id,
      table.table_name,
      table.is_occupied,
      table.user_id,
    );
  }

  isEmpty(): boolean {
    return (
      this.tableId === -1 &&
      this.tableName === '' &&
      !this.isOccupied &&
      this.customerId === -1
    );
  }
}
