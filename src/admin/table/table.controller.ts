import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CustomerId } from '../../model/customer-id';
import { Table } from '../../model/table';
import { CreateTableRequest } from './table.add.request';
import { TableService } from './table.service';
import { UpdateTableRequest } from './table.update.request';

@Controller('admin/table')
export class TableController {
  constructor(private readonly service: TableService) {}

  @Get()
  @HttpCode(200)
  async tables(@Req() req): Promise<Table[]> {
    const decoded: CustomerId = req.app.locals.decoded;
    const tables = await this.service.getTableOf(decoded.customerId);
    if (tables[0].isEmpty()) return null;
    return tables;
  }

  @Post()
  @HttpCode(201)
  async createTable(@Req() req, @Body() body: CreateTableRequest) {
    const decoded: CustomerId = req.app.locals.decoded;
    const result = await this.service.createTable(decoded.customerId, body);
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }

  @Put(':id')
  @HttpCode(200)
  async updateTable(
    @Req() req,
    @Param('id') id: string,
    @Body() body: UpdateTableRequest,
  ) {
    const decoded: CustomerId = req.app.locals.decoded;
    const table_id = parseInt(id);
    if (isNaN(table_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    const result = await this.service.updateTable(
      table_id,
      decoded.customerId,
      body,
    );
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTable(@Req() req, @Param('id') id: string) {
    const decoded: CustomerId = req.app.locals.decoded;
    const table_id = parseInt(id);
    if (isNaN(table_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    const result = await this.service.deleteTable(table_id, decoded.customerId);
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }
}
