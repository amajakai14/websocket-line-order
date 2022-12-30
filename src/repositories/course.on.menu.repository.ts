import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseOnMenuRepository {
  constructor(private prisma: PrismaService) {}

  async getCoursesAndMenus(user_id: number) {
    return await this.prisma.tbl_course_on_menu.findMany({
      select: {
        course: { select: { id: true, course_name: true } },
        menu: { select: { id: true, menu_name: true, menu_type: true } },
      },
      where: { user: { id: user_id } },
    });
  }

  async createCourseOnMenu(
    user_id: number,
    menu_id: number,
    course_id: number,
  ): Promise<boolean> {
    const result = await this.prisma.tbl_course_on_menu.create({
      data: {
        course: { connect: { id: course_id } },
        menu: { connect: { id: menu_id } },
        user: { connect: { id: user_id } },
      },
    });
    return result != null;
  }

  async deleteCourseOnMenu(
    user_id: number,
    menu_id: number,
    course_id: number,
  ): Promise<boolean> {
    const result = await this.prisma.tbl_course_on_menu.deleteMany({
      where: { course_id, menu_id, user_id },
    });
    return result.count !== 0;
  }
}
