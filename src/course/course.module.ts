import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseRepository } from '../repositories/course.repository';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, PrismaService],
})
export class CourseModule {}
