import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CustomerId } from '../../model/customer-id';
import { CreateTableRequest } from './table.add.request';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private readonly service: TableService) {}

  @Post()
  async createTable(@Req() req, @Body() body: CreateTableRequest) {
    const decoded: CustomerId = req.app.locals.decoded;
    return;
  }

  @Delete(':id')
  async deleteTable(
    @Req() req,
    @Param('id') id: string,
    @Body() body: CreateTableRequest,
  ) {
    const decoded: CustomerId = req.app.locals.decoded;
    const table_id = parseInt(id);
    if (isNaN(table_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    this.service.updateTable(table_id, decoded.customerId, body);
    return;
  }
}
