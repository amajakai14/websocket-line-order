import { Injectable } from '@nestjs/common';
import { CreateTableRequest } from '../admin/table/table.add.request';
import { Table } from '../model/table';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTableRequest } from './../admin/table/table.update.request';

@Injectable()
export class TableRepository {
  constructor(private prisma: PrismaService) {}

  async createTableOf(id: number, req: CreateTableRequest): Promise<boolean> {
    const result = this.prisma.tbl_table.create({
      data: {
        table_name: req.table_name,
        is_occupied: false,
        customer: { connect: { id } },
      },
    });
    return result != null;
  }

  async getTableOf(id: number, customer_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_table.findFirst({
      where: { id, customer_id },
    });
    return result != null;
  }

  async updateTableOf(id: number, req: UpdateTableRequest): Promise<boolean> {
    this.prisma.tbl_table.update({
      where: { id },
      data: {
        table_name: req.table_name,
        is_occupied: req.is_occupied,
        customer: { connect: { id } },
      },
    });
    return;
  }

  async getTablesOf(customer_id: number): Promise<Table[]> {
    const tables = await this.prisma.tbl_table.findMany({
      where: { customer_id },
    });
    if (tables.length === 0) return [Table.empty()];
    return tables.map((table) => Table.of(table));
  }

  async deleteTableOf(id: number, customer_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_table.deleteMany({
      where: { id, customer_id },
    });
    return result.count != 0;
  }
}
