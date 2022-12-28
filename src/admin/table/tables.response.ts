import { Result } from '../../model/result';
import { Table } from '../../model/table';

export class TablesResponse {
  readonly tables: Table[];
  readonly result: Result;

  constructor(tables: Table[], result: Result) {
    this.tables = tables;
    this.result = result;
  }
}
