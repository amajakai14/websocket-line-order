import { Injectable } from '@nestjs/common';
import { Course } from '../model/course';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseRepository {
  constructor(private prisma: PrismaService) {}

  async getCourseOf(id: number, customer_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_course.findFirst({
      where: { id, customer_id },
    });
    return result != null;
  }

  async getCoursesOf(customer_id: number): Promise<Course[]> {
    const courses = await this.prisma.tbl_course.findMany({
      where: { customer_id },
    });
    if (courses.length === 0) return [Course.empty()];
    return courses.map((course) => Course.of(course));
  }

  async createCourseOf(customer_id: number, req: any): Promise<boolean> {
    const result = await this.prisma.tbl_course.create({
      data: {
        course_name: req.name,
        course_priority: req.course_priority,
        course_timelimit: req.timelimit,
        customer: { connect: { id: customer_id } },
      },
    });
    return result != null;
  }

  async updateCourseOf(
    id: number,
    customer_id: number,
    req: any,
  ): Promise<boolean> {
    await this.prisma.tbl_course.updateMany({
      where: { id, customer_id },
      data: {
        course_name: req.course_name,
        course_priority: req.course_priority,
        course_timelimit: req.course_timelimit,
        updated_at: new Date(),
      },
    });
    return;
  }

  async deleteCourseOf(id: number, customer_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_table.deleteMany({
      where: { id, customer_id },
    });
    return result.count != 0;
  }
}
