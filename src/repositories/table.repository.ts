import { Injectable } from '@nestjs/common';
import { CreateTableRequest } from '../admin/table/table.add.request';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TableRepository {
  constructor(private prisma: PrismaService) {}

  async createTableOf(id: number, req: CreateTableRequest) {
    this.prisma.tbl_table.create({
      data: {
        table_name: req.table_name,
        is_occupied: false,
        customer: { connect: { id } },
      },
    });
    return;
  }

  async updateTableOf(id: number, req: CreateTableRequest) {
    this.prisma.tbl_table.create({
      data: {
        table_name: req.table_name,
        is_occupied: false,
        customer: { connect: { id } },
      },
    });
    return;
  }

  async getTablesOf(customer_id: number) {
    return await this.prisma.tbl_table.findMany({ where: { customer_id } });
  }

  async deleteTableOf(id: number): Promise<boolean> {
    const result = await this.prisma.tbl_table.delete({ where: { id } });
    return !(result == null);
  }
}
