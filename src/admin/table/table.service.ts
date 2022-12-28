import { Injectable } from '@nestjs/common';
import { TableRepository } from '../../repositories/table.repository';
import { CreateTableRequest } from './table.add.request';

@Injectable()
export class TableService {
  constructor(private readonly repository: TableRepository) {}

  async createTable(customerId: number, req: CreateTableRequest) {
    this.repository.createTableOf(customerId, req);
  }

  async updateTable(
    tableId: number,
    customerId: number,
    req: CreateTableRequest,
  ) {
    this.repository.createTableOf(customerId, req);
  }
}
