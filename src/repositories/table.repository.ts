import { Injectable } from '@nestjs/common';
import { CreateTableRequest } from '../admin/table/table.add.request';
import { Table } from '../model/table';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTableRequest } from './../admin/table/table.update.request';

@Injectable()
export class TableRepository {
  constructor(private prisma: PrismaService) {}

  async createTableOf(
    user_id: number,
    req: CreateTableRequest,
  ): Promise<boolean> {
    const result = this.prisma.tbl_table.create({
      data: {
        table_name: req.table_name,
        is_occupied: false,
        user: { connect: { id: user_id } },
      },
    });
    return result != null;
  }

  async getTableOf(id: number, user_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_table.findFirst({
      where: { id, user_id },
    });
    return result != null;
  }

  async updateTableOf(user_id: number, req: UpdateTableRequest): Promise<void> {
    await this.prisma.tbl_table.update({
      where: { id: user_id },
      data: {
        table_name: req.table_name,
        is_occupied: req.is_occupied,
        user: { connect: { id: user_id } },
      },
    });
  }

  async getTablesOf(user_id: number): Promise<Table[]> {
    const tables = await this.prisma.tbl_table.findMany({
      where: { user_id },
    });
    if (tables.length === 0) return [Table.empty()];
    return tables.map((table) => Table.of(table));
  }

  async deleteTableOf(id: number, user_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_table.deleteMany({
      where: { id, user_id },
    });
    return result.count != 0;
  }
}
