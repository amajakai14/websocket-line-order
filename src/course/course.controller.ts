import { Controller, Delete, HttpException, Post, Put } from '@nestjs/common';
import { Body, Get, Req } from '@nestjs/common/decorators';
import { CustomerId } from '../model/customer-id';
import { Result } from './../model/result';
import { CourseAddRequest } from './course.add.request';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Get()
  async getCourse(@Req() req) {
    const decoded: CustomerId = req.app.locals.decoded;
    const response = await this.service.getCourse(decoded.customerId);
    if (response instanceof Result) {
      throw new HttpException(response.errorMessage, response.httpStatus);
    }
    return response;
  }

  @Post()
  async createCourse(@Req() req, @Body() courseAddRequest: CourseAddRequest) {
    const decoded: CustomerId = req.app.locals.decoded;
    this.service.createCourse(decoded.customerId, courseAddRequest);
    return;
  }

  @Put(':id')
  async updateCourse() {
    this.service.updateCourse();
    return;
  }

  @Delete(':id')
  async deleteCourse() {
    this.service.deleteCourse();
    return;
  }
}
