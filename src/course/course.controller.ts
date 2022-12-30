import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { Body, Get, Param, Req } from '@nestjs/common/decorators';
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
  async updateCourse(
    @Req() req,
    @Param() id: string,
    @Body() courseUpdateRequest: CourseAddRequest,
  ) {
    const decoded: CustomerId = req.app.locals.decoded;
    const course_id = parseInt(id);
    if (isNaN(course_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    return this.service.updateCourse(
      decoded.customerId,
      course_id,
      courseUpdateRequest,
    );
  }

  @Delete(':id')
  async deleteCourse(@Req() req, @Param() id: string) {
    const decoded: CustomerId = req.app.locals.decoded;
    const course_id = parseInt(id);
    if (isNaN(course_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    return this.service.deleteCourse(course_id, decoded.customerId);
  }
}
