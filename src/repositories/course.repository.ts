import { Injectable } from '@nestjs/common';
import { CourseAddRequest } from '../course/course.add.request';
import { Course } from '../model/course';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseRepository {
  constructor(private prisma: PrismaService) {}

  async getCourseOf(id: number, user_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_course.findFirst({
      where: { id, user_id },
    });
    return result != null;
  }

  async getCoursesOf(user_id: number): Promise<Course[]> {
    const courses = await this.prisma.tbl_course.findMany({
      where: { user_id },
    });
    if (courses.length === 0) return [Course.empty()];
    return courses.map((course) => Course.of(course));
  }

  async createCourseOf(user_id: number, req: CourseAddRequest) {
    return await this.prisma.tbl_course.create({
      data: {
        course_name: req.name,
        course_priority: req.course_priority,
        course_timelimit: req.timelimit,
        user: { connect: { id: user_id } },
      },
    });
  }

  async updateCourseOf(
    id: number,
    user_id: number,
    req: any,
  ): Promise<boolean> {
    await this.prisma.tbl_course.updateMany({
      where: { id, user_id },
      data: {
        course_name: req.course_name,
        course_priority: req.course_priority,
        course_timelimit: req.course_timelimit,
        updated_at: new Date(),
      },
    });
    return;
  }

  async deleteCourseOf(id: number, user_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_table.deleteMany({
      where: { id, user_id },
    });
    return result.count != 0;
  }
}
