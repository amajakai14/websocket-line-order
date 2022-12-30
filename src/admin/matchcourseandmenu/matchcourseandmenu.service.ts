import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseOnMenuRepository } from '../../repositories/course.on.menu.repository';
import { CourseRepository } from '../../repositories/course.repository';
import { MenuRepository } from '../../repositories/menu.repository';

type TCourse = {
  id: number;
  course_name: string;
};

type TMenu = {
  id: number;
  menu_name: string;
  menu_type: string;
};

type TCourseMenu = {
  course: TCourse;
  menu: TMenu;
};

type TCourseData = {
  course_id: number;
  course_name: string;
  menus: TMenu[];
};

@Injectable()
export class MatchCourseAndMenuService {
  constructor(
    private readonly repository: CourseOnMenuRepository,
    private readonly menuRepository: MenuRepository,
    private readonly courseRepository: CourseRepository,
  ) {}
  async getCoursesAndMenus(userId: number) {
    const records: TCourseMenu[] = await this.repository.getCoursesAndMenus(
      userId,
    );
    const mappedCourses: TCourseData[] = records.reduce((acc, curr) => {
      const { course, menu } = curr;
      const { id, course_name } = course;

      const existingCourse = acc.find((c) => c.course_id === id);
      if (existingCourse) {
        existingCourse.menus.push(menu);
      } else {
        acc.push({ course_id: id, course_name, menus: [menu] });
      }

      return acc;
    }, []);
    return mappedCourses;
  }

  async matchCourseAndMenu(userId: number, menuId: number, courseId: number) {
    const menu = await this.menuRepository.getMenuOf(menuId, userId);
    if (menu.isEmpty()) {
      throw new NotFoundException('menu does not exist');
    }

    const course = await this.courseRepository.getCourseOf(courseId, userId);

    if (!course) {
      throw new NotFoundException('course does not exist');
    }
    return await this.repository.createCourseOnMenu(userId, menuId, courseId);
  }

  async deleteCourseAndMenu(userId: number, menuId: number, courseId: number) {
    return await this.repository.deleteCourseOnMenu(userId, menuId, courseId);
  }
}
