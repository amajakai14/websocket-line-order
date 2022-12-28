import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from '../../model/result';
import { Table } from '../../model/table';
import { TableRepository } from '../../repositories/table.repository';
import { CreateTableRequest } from './table.add.request';
import { UpdateTableRequest } from './table.update.request';

@Injectable()
export class TableService {
  constructor(private readonly repository: TableRepository) {}

  async getTableOf(customerId: number): Promise<Table[]> {
    return await this.repository.getTablesOf(customerId);
  }

  async createTable(
    customerId: number,
    req: CreateTableRequest,
  ): Promise<Result> {
    const success = this.repository.createTableOf(customerId, req);
    return success
      ? Result.OK()
      : Result.BAD(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'error creating table for customer to db',
        );
  }

  async updateTable(
    tableId: number,
    customerId: number,
    req: UpdateTableRequest,
  ): Promise<Result> {
    const exist = this.repository.getTableOf(tableId, customerId);
    if (!exist) {
      return Result.BAD(HttpStatus.NOT_FOUND, 'table not found');
    }
    const success = this.repository.updateTableOf(tableId, req);
    return success
      ? Result.OK()
      : Result.BAD(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'error updating to database',
        );
  }

  async deleteTable(tableId: number, customerId: number): Promise<Result> {
    const success = this.repository.deleteTableOf(tableId, customerId);
    return success
      ? Result.OK()
      : Result.BAD(HttpStatus.INTERNAL_SERVER_ERROR, '');
  }
}
