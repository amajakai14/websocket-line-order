import { HttpStatus, Injectable } from '@nestjs/common';
import { Result } from '../model/result';
import { CourseRepository } from './../repositories/course.repository';
import { CourseAddRequest } from './course.add.request';
import { CoursesResponse } from './courses.response';

@Injectable()
export class CourseService {
  constructor(private readonly repository: CourseRepository) {}

  async getCourse(customerId: number) {
    const courses = await this.repository.getCoursesOf(customerId);
    if (courses[0].isEmpty()) {
      return Result.BAD(HttpStatus.NOT_FOUND, 'no course is found');
    }
    return courses as CoursesResponse;
  }

  async createCourse(customerId: number, req: CourseAddRequest) {
    return await this.repository.createCourseOf(customerId, req);
  }

  async updateCourse(
    customerId: number,
    courseId: number,
    req: CourseAddRequest,
  ) {
    return await this.repository.updateCourseOf(courseId, customerId, req);
  }

  async deleteCourse(courseId: number, customerId: number) {
    return await this.repository.deleteCourseOf(courseId, customerId);
  }
}
