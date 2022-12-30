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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { AuthUser } from '../../auth/auth.user.decorator';
import { UserWithoutPassword } from '../../auth/jwt/jwt.payload';
import { Table } from '../../model/table';
import { CreateTableRequest } from './table.add.request';
import { TableService } from './table.service';
import { UpdateTableRequest } from './table.update.request';

@Controller('admin/table')
export class TableController {
  constructor(private readonly service: TableService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async tables(@AuthUser() user: UserWithoutPassword): Promise<Table[]> {
    const tables = await this.service.getTableOf(user.userId);
    if (tables[0].isEmpty()) return null;
    return tables;
  }

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async createTable(
    @AuthUser() user: UserWithoutPassword,
    @Body() body: CreateTableRequest,
  ) {
    const result = await this.service.createTable(user.userId, body);
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async updateTable(
    @AuthUser() user: UserWithoutPassword,
    @Param('id') id: string,
    @Body() body: UpdateTableRequest,
  ) {
    const table_id = parseInt(id);
    if (isNaN(table_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    const result = await this.service.updateTable(table_id, user.userId, body);
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async deleteTable(
    @AuthUser() user: UserWithoutPassword,
    @Param('id') id: string,
  ) {
    const table_id = parseInt(id);
    if (isNaN(table_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    const result = await this.service.deleteTable(table_id, user.userId);
    if (result.isBad()) {
      throw new HttpException(result.errorMessage, result.httpStatus);
    }
  }
}
