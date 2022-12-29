import { Course } from '../model/course';

export type CoursesResponse = Omit<Course, 'customerId'>[];
