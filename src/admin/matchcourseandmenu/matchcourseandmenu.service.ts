import { Injectable } from '@nestjs/common';
import { CourseOnMenuRepository } from '../../repositories/course.on.menu.repository';

@Injectable()
export class MatchCourseAndMenuService {
  constructor(private readonly repository: CourseOnMenuRepository) {}
  async getCoursesAndMenus(userId: number) {
    return await this.repository.getCoursesAndMenus(userId);
  }

  async matchCourseAndMenu(userId: number, menuId: number, courseId: number) {
    //todo check that menuId and courseId are belong to user
    return await this.repository.createCourseOnMenu(userId, menuId, courseId);
  }

  async deleteCourseAndMenu(userId: number, menuId: number, courseId: number) {
    return await this.repository.deleteCourseOnMenu(userId, menuId, courseId);
  }
}
