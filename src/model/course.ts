import { tbl_course } from '@prisma/client';

export class Course {
  courseId: number;
  courseName: string;
  courseTimelimit: number;
  coursePriority: number;
  createdDate: Date;
  updatedDate: Date;
  customerId: number;

  constructor(
    courseId: number,
    courseName: string,
    courseTimelimit: number,
    coursePriority: number,
    createdDate: Date,
    updatedDate: Date,
    customerId: number,
  ) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.courseTimelimit = courseTimelimit;
    this.coursePriority = coursePriority;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.customerId = customerId;
  }

  static of(course: tbl_course) {
    return new Course(
      course.id,
      course.course_name,
      course.course_timelimit,
      course.course_priority,
      course.created_at,
      course.updated_at,
      course.customer_id,
    );
  }

  isEmpty(): boolean {
    return (
      this.courseId === -1 &&
      this.courseName === '' &&
      this.courseTimelimit === -1 &&
      this.coursePriority === -1 &&
      this.customerId === -1
    );
  }

  static empty(): Course {
    return new Course(-1, '', -1, -1, new Date(), new Date(), -1);
  }
}
