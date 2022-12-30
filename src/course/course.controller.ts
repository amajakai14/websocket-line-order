import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { Body, Get, Param, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/auth.user.decorator';
import { UserWithoutPassword } from '../auth/jwt/jwt.payload';
import { Result } from './../model/result';
import { CourseAddRequest } from './course.add.request';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCourse(@AuthUser() user: UserWithoutPassword) {
    const response = await this.service.getCourse(user.userId);
    if (response instanceof Result) {
      throw new HttpException(response.errorMessage, response.httpStatus);
    }
    return response;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCourse(
    @AuthUser() user: UserWithoutPassword,
    @Body() courseAddRequest: CourseAddRequest,
  ) {
    return await this.service.createCourse(user.userId, courseAddRequest);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateCourse(
    @AuthUser() user: UserWithoutPassword,
    @Param() id: string,
    @Body() courseUpdateRequest: CourseAddRequest,
  ) {
    const course_id = parseInt(id);
    if (isNaN(course_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    return this.service.updateCourse(
      user.userId,
      course_id,
      courseUpdateRequest,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCourse(
    @AuthUser() user: UserWithoutPassword,
    @Param() id: string,
  ) {
    const course_id = parseInt(id);
    if (isNaN(course_id)) {
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
    }
    return this.service.deleteCourse(course_id, user.userId);
  }
}
